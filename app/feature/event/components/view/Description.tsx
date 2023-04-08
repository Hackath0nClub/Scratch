type propsType = {
  text: string
}

const DescriptionRow = (props: propsType) => {
  return (
    <>
      <p className="text-white text-left font-bold text-2xl my-4">
        イベント概要
      </p>
      <p className="whitespace-pre-wrap text-white text-base">{props.text}</p>
    </>
  )
}

export default DescriptionRow