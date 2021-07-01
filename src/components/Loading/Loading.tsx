import loadGif from './loading.gif'

export default function Loading() {
    return (
        <div className="text-center">
            <img src={loadGif} alt="loading" />
        </div>
    )
}