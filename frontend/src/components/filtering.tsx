import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const Filtering = () => {
    return (
        <div className="border border-gray-600/18 rounded-md py-4 px-4">
            <div className="flex ">
                <Input className="w-[50%] mr-3 py-5" type="text" placeholder="Buscar por título, autor ou gênero..." />
                <div className="flex gap-5">
                    <Button className="rounded-full  bg-gray-900 hover:bg-gray-700 cursor-pointer">Todos</Button>
                    <Button className="rounded-full  bg-gray-900 hover:bg-gray-700 cursor-pointer">Quero ler</Button>
                    <Button className="rounded-full  bg-gray-900 hover:bg-gray-700 cursor-pointer">Lendo</Button>
                    <Button className="rounded-full  bg-gray-900 hover:bg-gray-700 cursor-pointer">Lido</Button>
                    <Button className="rounded-full  bg-gray-900 hover:bg-gray-700 cursor-pointer">Favoritos</Button>
                    <Select>
                        <SelectTrigger className="w-[180px]  bg-gray-900 text-white font-bold data-[placeholder]:text-white">
                            <SelectValue className="text-white" placeholder="aa" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="addition-data">Data de Adição</SelectItem>
                            <SelectItem value="title">Título</SelectItem>
                            <SelectItem value="author">Autor</SelectItem>
                            <SelectItem value="pages">Páginas</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="rounded-full  bg-gray-900 hover:bg-gray-700 cursor-pointer">Favoritos</Button>
                    <Button className="rounded-full  bg-gray-900 hover:bg-gray-700 cursor-pointer">Favoritos</Button>
                </div>
            </div>

        </div>
    )
}