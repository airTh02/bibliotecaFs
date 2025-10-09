import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "./button"
import { LogOut } from 'lucide-react';


type Props = {
    onConfirm: () => void
}


export const Modal = ({ onConfirm }: Props) => {

    const [open, setOpen] = useState(false)

    return (

        <div>
            <Button variant={"outline"} className=" bg-gray-800 text-white border-0 cursor-pointer mr-2" size={`sm`} onClick={() => setOpen(true)}><LogOut/>Sair</Button>

            <Dialog open={open} onOpenChange={setOpen} >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deseja realmente sair?</DialogTitle>
                        <DialogDescription>
                            Você precisará fazer login novamente para acessar o sistema.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button  className="cursor-pointer" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button  className="cursor-pointer" onClick={() => { onConfirm(); setOpen(false) }}>Sair</Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

    )
}