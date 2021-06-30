import './Pagination.scss'


export interface IPaginationProps {
    direction:string,
    callback:any
}

const Pagination: React.FC<IPaginationProps> = ({
    direction, 
    callback
}) => {
    if (direction === 'right') {
        return (
            <div className='arrowR'>
                <div className="arrow" onClick={callback}>
                    <div className="arrow-top"></div>
                    <div className="arrow-bottom"></div>
                </div>
            </div>
        )
    } else {
        return (
                <div className='arrowL'>
                    <div className="arrow" onClick={callback}>
                        <div className="arrow-top"></div>
                        <div className="arrow-bottom"></div>
                    </div>
                </div>
        )
    }
}
export default Pagination