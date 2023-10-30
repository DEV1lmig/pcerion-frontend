import UnderlineLink from "@modules/common/components/underline-link"

const EmptyCartMessage = () => {
  return (
    <div className="bg-amber-100 px-8 py-24 flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl-semi">Tu carro de compras está vacio</h1>
      <p className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        No tienes&apos;nada en tu carro de compras Cambiemo&apos;s eso,  use
        el siguiente enlace para comenzar a explorar nuestros productos.
      </p>
      <div>
        <UnderlineLink href="/store">Explore products</UnderlineLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
