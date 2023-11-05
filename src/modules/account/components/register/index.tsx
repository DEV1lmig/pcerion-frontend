import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Spinner from "@modules/common/icons/spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm, } from "react-hook-form"
import { RegisterSchema } from "@lib/util/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

type RegisterCredentials = z.infer<typeof RegisterSchema>

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (e: Error) => {
    setAuthError("A ocurrido un error. Por favor intente de nuevo.")
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>({ resolver: zodResolver(RegisterSchema) })

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.customers
      .create(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm flex flex-col items-center mt-12">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      )}
      <h1 className="text-large-semi uppercase mb-6">Conviértase en miembro de PCERION</h1>
      <p className="text-center text-base-regular text-gray-700 mb-4">
      Cree su perfil de miembro de PCERION y obtenga acceso a una plataforma de compras mejorada
        experiencia.
      </p>
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Nombre"
            {...register("first_name", { required: "Se requiere su nombre" })}
            autoComplete="given-name"
            errors={errors}
          />
          {errors.first_name && <span>{errors.first_name.message}</span>}
          <Input
            label="Apellido"
            {...register("last_name", { required: "Se requiere su apellido" })}
            autoComplete="family-name"
            errors={errors}
          />
          {errors.last_name && <span>{errors.last_name.message}</span>}
          <Input
            label="Email"
            {...register("email", { required: "Se requiere su email" })}
            autoComplete="email"
            errors={errors}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <Input
            label="Telefono"
            {...register("phone")}
            autoComplete="tel"
            errors={errors}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
          <Input
            label="Contraseña"
            {...register("password", {
              required: "Se requiere una contraseña",
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
            Alguno de los datos ingresados no son correctos
            </span>
          </div>
        )}
        <span className="text-center text-gray-700 text-small-regular mt-6">
        Al crear una cuenta, aceptas las {" "}
          <Link href="/content/privacy-policy" className="underline">
            Politica de privacidad
          </Link>{" "}
          y{" "}
          <Link href="/content/terms-of-use" className="underline">
            Terminos de uso de PCERION
          </Link>
          .
        </span>
        <Button className="mt-6">Join</Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        Ya eres un miembro?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Iniciar sesión

        </button>
        .
      </span>
    </div>
  )
}

export default Register
