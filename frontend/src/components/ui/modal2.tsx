import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "./button";
import { useState } from "react";

type Props = {
    onConfirm: () => void
    setModal: (value:boolean) => void
    open: boolean
    title: string
    description: string
    button1: string
    button2: string
}

export const Modal2 = ({ onConfirm, setModal, open, title, description, button1, button2 }: Props) => {


    return (
        <div>
            <Dialog open={open} onOpenChange={setModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button className="cursor-pointer" onClick={() => setModal(false)} >{button1}</Button>
                        <Button className="cursor-pointer" onClick={() => { onConfirm(); setModal(false) }}>{button2}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}