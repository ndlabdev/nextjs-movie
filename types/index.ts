import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface IGeneral {
    page: number
    total_pages: number
    total_results: number
}
