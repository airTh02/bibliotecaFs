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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Props = {
    open: boolean
    setModal: (value: boolean) => void
}

export const AddBookModal = ({ open, setModal }: Props) => {
    return (
        <div>
            <Dialog open={open} onOpenChange={setModal}  >
                <DialogContent  className="bg-gray-900  border-1 border-gray-500 rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-white font-bold">Adicionar Novo Livro</DialogTitle>
                        <DialogDescription className="text-gray-300 mt-2">
                            Preencha as informações do livro que deseja adicionar à sua estante pessoal.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-row gap-4 items-center">
                            <div className="flex flex-col gap-2 w-[100%] ">
                                <p className="font-bold text-white text-sm">Título *</p>
                                <Input
                                    className=" w-full border-1 border-gray-500 rounded-2xl  focus-visible:ring-0  focus-visible:border-blue-500  bg-gray-900 text-white"
                                    type="text"
                                    placeholder="Nome do livro"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-[100%]">
                                <p className="font-bold text-white text-sm">Nome *</p>
                                <Input
                                    className=" w-full  border-1 border-gray-500 rounded-2xl  focus-visible:ring-0  focus-visible:border-blue-500  bg-gray-900 text-white"
                                    type="text"
                                    placeholder="Nome do autor"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <div className="flex flex-col gap-2 w-[100%]">
                                <p className="font-bold text-white text-sm">Genero</p>
                                <Input
                                    className=" w-full border-1 border-gray-500 rounded-2xl  focus-visible:ring-0  focus-visible:border-blue-500  bg-gray-900 text-white"
                                    type="text"
                                    placeholder="Nome"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-[100%]">
                                <p className="font-bold text-white text-sm">Ano</p>
                                <Input
                                    className=" w-full  border-1 border-gray-500 rounded-2xl  focus-visible:ring-0  focus-visible:border-blue-500  bg-gray-900 text-white"
                                    type="text"
                                    placeholder="1991"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <div className="flex flex-col gap-2 w-[100%]">
                                <p className="font-bold text-white text-sm">Status</p>
                                <Select defaultValue="quer ler" >
                                    <SelectTrigger className="w-[100%] border-1 border-gray-500 rounded-2xl  focus-visible:ring-0  focus-visible:border-blue-500  bg-gray-900 text-white ">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className=" px-1 py-1 bg-black border-gray-500 rounded-2xl">
                                        <SelectItem className=" text-white focus:text-black focus:bg-blue-500 rounded-xl" value="quer ler">Quero ler</SelectItem>
                                        <SelectItem className=" text-white focus:text-black focus:bg-blue-500 rounded-xl" value="lendo">Lendo</SelectItem>
                                        <SelectItem className=" text-white focus:text-black focus:bg-blue-500 rounded-xl" value="lido">Lido</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-[100%]">
                                <p className="font-bold text-white text-sm">Sinopse</p>
                                 <Textarea 
                                    placeholder="Uma breve descrição do livro..."
                                    className="w-full h-30 border-1 border-gray-500 rounded-2xl  focus-visible:ring-0  focus-visible:border-blue-500  bg-gray-900 text-white"
                                />
                            </div>
                    </div>
                    <DialogFooter>
                        <Button variant={'outline'} className="cursor-pointer bg-transparent text-white border border-gray-500 rounded-2xl  hover:bg-blue-500 hover:border-transparent py-4.5">aaa</Button>
                        <Button variant={'outline'} className="cursor-pointer bg-red-900 text-gray-900 rounded-2xl border-0 hover:bg-red-900/80 py-4.5"> aa</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}