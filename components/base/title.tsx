interface Props {
    title: string
    tag?: keyof JSX.IntrinsicElements
    children?: React.ReactNode
}

export default function BaseTitle({ title, tag: Tag = 'h1', children }: Props) {
    return (
        <div className="flex-auto m-0">
            <div className="flex items-center gap-x-11 gap-y-4 max-md:overflow-x-auto">
                <div className="flex-auto">
                    <div className="relative flex items-center gap-1 pl-4 before:absolute before:left-0 before:h-5/6 before:w-1 before:rounded before:bg-primary">
                        <Tag className="text-2xl md:text-3xl font-semibold">{title}</Tag>
                    </div>
                </div>

                {children}
            </div>
        </div>
    )
}
