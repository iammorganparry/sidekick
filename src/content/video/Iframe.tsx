import { CSS, styled } from "@nextui-org/react"
import { FC } from "react"

const Iframe = styled('iframe', {
    zIndex: 99998,
})
export const XIframe: FC<{ src?: string, css?: CSS }> = ({ src, css }) => (
    <Iframe
        css={css}
        width="560"
        height="315"
        src={src}
        onDrag={(e) => console.log('am i doing anything??')}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen
    />
)