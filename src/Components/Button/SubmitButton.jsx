export function SubmitButton({onClick}) {
    return (
        <button
        onClick={e => onClick(e)}>
            Submit
        </button>
    )
}