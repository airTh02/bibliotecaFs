import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserBook } from "@/api/dashboard";

type Props = {
  open: boolean
  setModal: (value: boolean) => void
  onBookCreated: () => void
}

const addBookSchema = z.object({
  title: z.string().min(1, 'Nome do título obrigatório.'),
  author: z.string().min(1, 'Nome do autor obrigatório.'),
  genre: z.string().min(1, 'Gênero do livro é obrigatório.'),
  year: z.number().min(1000, 'Ano inválido.').max(new Date().getFullYear(), 'Ano não pode ser maior que o atual'),
  synopsis: z.string(),
  status: z.enum(['quer ler', 'lendo', 'lido'])
})

type AddBookType = z.infer<typeof addBookSchema>

export const AddBookModal = ({ open, setModal, onBookCreated }: Props) => {

  const form = useForm({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      year: undefined,
      synopsis: '',
      status: 'quer ler'
    }
  })

  const onSubmit = async (data: AddBookType) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return
      const newBook = await addUserBook(
          token,
          data.title,
          data.author,
          data.genre,
          data.year,
          data.status,
          data.synopsis
      )
      onBookCreated()
      setModal(false)
      form.reset()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setModal}  >
        <DialogContent className="bg-gray-900  border-1 border-gray-500 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-white font-bold">Adicionar Novo Livro</DialogTitle>
            <DialogDescription className="text-gray-300 mt-2">
              Preencha as informações do livro que deseja adicionar à sua estante pessoal.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-4 items-center">
                  <div className="flex flex-col gap-2 w-[100%] ">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-white text-sm">Título *</FormLabel>
                          <FormControl>
                            <Input
                              className=" selection:bg-blue-700 w-full border-1 border-gray-500 rounded-2xl  focus-visible:ring-0  focus-visible:border-blue-500   text-white"
                              type="text"
                              placeholder="Nome do livro"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-[100%]">
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-white text-sm">Nome *</FormLabel>
                          <FormControl>
                            <Input
                              className=" selection:bg-blue-700 w-full  border-1 border-gray-500 rounded-2xl  focus-visible:ring-0  focus-visible:border-blue-500 select  text-white"
                              type="text"
                              placeholder="Nome do autor"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <div className="flex flex-col gap-2 w-[100%]">
                    <FormField
                      control={form.control}
                      name="genre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-white text-sm">Gênero *</FormLabel>
                          <FormControl>
                            <Input
                              className=" selection:bg-blue-700 w-full border-1 border-gray-500 rounded-2xl  focus-visible:ring-0  focus-visible:border-blue-500   text-white"
                              type="text"
                              placeholder="Gênero"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-[100%]">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-white text-sm">Ano *</FormLabel>
                          <FormControl>
                            <Input
                              className="selection:bg-blue-700 w-full border-1 border-gray-500 rounded-2xl focus-visible:ring-0 focus-visible:border-blue-500 text-white"
                              type="number"
                              placeholder="1991"
                              value={field.value ?? ''}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === '' ? undefined : Number(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <div className="flex flex-col gap-2 w-[100%]">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-[100%] border-1 border-gray-500 rounded-2xl  focus-visible:ring-0  focus-visible:border-blue-500   text-white ">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="px-1 py-1 bg-black border-gray-500 rounded-2xl">
                              <SelectItem className=" text-white focus:text-black focus:bg-blue-500 rounded-xl" value="quer ler">Quero ler</SelectItem>
                              <SelectItem className=" text-white focus:text-black focus:bg-blue-500 rounded-xl" value="lendo">Lendo</SelectItem>
                              <SelectItem className=" text-white focus:text-black focus:bg-blue-500 rounded-xl" value="lido">Lido</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-[100%]">
                  <FormField
                    control={form.control}
                    name="synopsis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-white text-sm">Sinopse *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Uma breve descrição do livro..."
                            className="w-full h-30 border-1 border-gray-500 rounded-2xl  focus-visible:ring-0  focus-visible:border-blue-500  bg-gray-900 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-50 w-[100%] mt-10">
                <Button type="button" variant={'outline'} className=" w-32 cursor-pointer bg-transparent text-white border border-gray-500 rounded-2xl  hover:bg-blue-500 hover:border-transparent py-5" onClick={() => setModal(false)} >Cancelar</Button>
                <Button type="submit" variant={'outline'} className=" w-32 cursor-pointer bg-blue-500 text-black border-0 rounded-2xl  hover:bg-blue-500/90 hover:border-transparent py-5" >Adicionar Livro</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}