import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/ui/button";
import { DialogTrigger } from "./ui/ui/dialog";
import icon from "../assets/img/icon.svg";
import { Progress, ProgressIndicator } from "./ui/ui/progress-bar";
import { Separator } from "./ui/ui/separator";
import { OutlineButton } from "./ui/ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import ptBR from 'dayjs/locale/pt-BR'
import { getSummary } from "../http/get-summary";

dayjs.locale(ptBR)

export function Summary() {
    const { data } = useQuery({
        queryKey: ['summary'],
        queryFn: getSummary,
        staleTime: 1000 * 60, // 60 seconds
    })

    if (!data) {
        return null
    }

    const firstDayOfWeek = dayjs().startOf('week').format('D MMM');
    const lastDayOfWeek = dayjs().endOf('week').format('D MMM');

    const completedPercentage = Math.round(data.completed * 100 / data.total)

    return (
        <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={icon} alt="" width={35} height={35} />
                    <span className="text-lg font-semibold capitalize">{firstDayOfWeek} - {lastDayOfWeek}</span>
                </div>

                <DialogTrigger asChild>
                    <Button className="size-sm">
                        <Plus className='size-4' />
                        Cadastrar Meta
                    </Button>
                </DialogTrigger>
            </div>

            <div className="flex flex-col gap-3">
                <Progress value={8} max={15}>
                    <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
                </Progress>

                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Você completou <span className="text-zinc-100">{data?.completed}</span> de <span className="text-zinc-100">{data?.total}</span> metas nessa semana.</span>
                    <span>{completedPercentage}</span>
                </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-3">
                <OutlineButton>
                    <Plus className="size-4 text-zinc-600" />
                    Meditar
                </OutlineButton>
                <OutlineButton>
                    <Plus className="size-4 text-zinc-600" />
                    Nadar
                </OutlineButton>
                <OutlineButton>
                    <Plus className="size-4 text-zinc-600" />
                    Praticar Exercicios
                </OutlineButton>
                <OutlineButton>
                    <Plus className="size-4 text-zinc-600" />
                    Me alimentar bem
                </OutlineButton>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-medium">Sua Semana</h2>

                {Object.entries(data.goalsPerDay).map(([date, goals]) => {
                    const weekDay = dayjs(date).format('dddd')
                    const formattedDate = dayjs(date).format('D [de] MMMM')
                    return (
                        <div key={date} className="flex flex-col gap-4">
                            <h3 className="font-medium">
                                {weekDay}{''}
                                <span className="text-zinc-400 text-xs"> {formattedDate}</span>
                            </h3>

                            <ul className="flex flex-col gap-3">
                                {goals.map(goal => {
                                    const time = dayjs(goal.completedAt).format('HH:mm')
                                    return (
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-pink-500" />
                                            <span className="text-sm text-zinc-400">
                                                Você completou "
                                                <span className="text-zinc-100">Acordar Cedo</span>" às {''}
                                                <span className="text-zinc-100">{time}h</span>
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}