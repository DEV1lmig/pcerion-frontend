import { Popover, Transition } from "@headlessui/react"
import {
  useFeaturedProductsQuery,
  useNavigationCollections,
} from "@lib/hooks/use-layout-data"
import { useProductCategories } from "medusa-react"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import clsx from "clsx"
import { chunk } from "lodash"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const DropdownMenu = () => {
  const [open, setOpen] = useState(false)
  const { push } = useRouter()
  const { data: collections, isLoading: loadingCollections } =
    useNavigationCollections()
  const { data: products, isLoading: loadingProducts } =
    useFeaturedProductsQuery()
  const { product_categories } = useProductCategories()

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="h-full"
    >
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          <>
            <Link href="/store" className="relative flex h-full" passHref>
              <Popover.Button
                className={clsx(
                  "relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none"
                )}
                onClick={() => push("/store")}
              >
                Tienda
              </Popover.Button>
            </Link>

            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                static
                className="absolute top-full inset-x-0 text-sm text-gray-700 z-30 border-y border-gray-200"
              >
                <div className="relative bg-white py-8">
                  <div className="flex items-start content-container">
                    <div className="flex flex-col flex-1 max-w-[30%]">
                      <h3 className="text-base-semi text-gray-900 mb-4">
                      recopilación
                      </h3>
                      <div className="flex items-start">
                        {collections &&
                          chunk(collections, 6).map((chunk, index) => {
                            return (
                              <ul
                                key={index}
                                className="min-w-[152px] max-w-[200px] pr-4"
                              >
                                {chunk.map((collection) => {
                                  return (
                                    <div
                                      key={collection.handle}
                                      className="pb-3"
                                    >
                                      <Link
                                        href={`/collections/${collection.handle}`}
                                        onClick={() => setOpen(false)}
                                      >
                                        {collection.title}
                                      </Link>
                                    </div>
                                  )
                                })}
                              </ul>
                            )
                          })}
                        {loadingCollections &&
                          repeat(6).map((index) => (
                            <div
                              key={index}
                              className="w-12 h-4 bg-gray-100 animate-pulse"
                            />
                          ))}
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 max-w-[30%]">
                      <h3 className="text-base-semi text-gray-900 mb-4">
                        Categorias
                      </h3>
                      <div className="flex items-start">
                        {product_categories && (
                          <div className="flex flex-col gap-y-2">
                            <ul className="grid grid-cols-1 gap-2">
                              {product_categories?.slice(0, 6).map((c) => {
                                if (c.parent_category) {
                                  return
                                }

                                const children =
                                  c.category_children?.map((child) => ({
                                    name: child.name,
                                    handle: child.handle,
                                    id: child.id,
                                  })) || null

                                return (
                                  <li
                                    className="flex flex-col gap-2"
                                    key={c.id}
                                  >
                                    <Link
                                      className={clsx(
                                        children && "text-small-semi"
                                      )}
                                      href={`/${c.handle}`}
                                    >
                                      {c.name}
                                    </Link>
                                    {children && (
                                      <ul className="grid grid-cols-1 ml-3 gap-2">
                                        {children &&
                                          children.map((child) => (
                                            <li key={child.id}>
                                              <Link href={`/${child.handle}`}>
                                                {child.name}
                                              </Link>
                                            </li>
                                          ))}
                                      </ul>
                                    )}
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-3 gap-4">
                        {products?.slice(0, 3).map((product) => (
                          <ProductPreview {...product} key={product.id} />
                        ))}
                        {loadingProducts &&
                          repeat(3).map((index) => (
                            <SkeletonProductPreview key={index} />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
    </div>
  )
}

export default DropdownMenu
