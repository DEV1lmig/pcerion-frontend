import medusaRequest from "@lib/medusa-fetch"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { Metadata } from "next"

type Props = {
  params: { id: string }
}

async function getOrder(id: string) {
  const res = await medusaRequest("GET", `/orders/${id}`)

  if (!res.ok) {
    throw new Error(`Error en obtener la orden: ${id}`)
  }

  return res.body
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { order } = await getOrder(params.id)

  return {
    title: `Orden #${order.display_id}`,
    description: `Revisa tu orden`,
  }
}

export default async function CollectionPage({ params }: Props) {
  const { order } = await getOrder(params.id)

  return <OrderCompletedTemplate order={order} />
}
