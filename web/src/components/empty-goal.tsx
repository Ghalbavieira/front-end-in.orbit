import { Plus } from "lucide-react";
import { Button } from "./ui/ui/button";
import { DialogTrigger } from "./ui/ui/dialog";
import logo from '../assets/img/logo-in.png';
import letStart from '../assets/img/lets-start.png';

export function EmptyGoal() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-8">
            <img src={logo} alt="logo da aplicação" />
            <img src={letStart} alt="Imagem de uma pessoa" />
            <p className='text-zinc-300 leading-relaxed max-w-80 text-center'>Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?</p>

            <DialogTrigger asChild>
                <Button>
                    <Plus className='size-4' />
                    Cadastrar Meta
                </Button>
            </DialogTrigger>
        </div>
    )
}