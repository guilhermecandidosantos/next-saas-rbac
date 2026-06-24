import { XCircle } from 'lucide-react'
import { redirect } from 'next/dist/client/components/navigation'

import { getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { shutdownOrganization } from '@/http/shutdown-organization'

export function ShutdownOrganizationButton() {
  async function shutdownOrganizationAction() {
    'use server'

    const currentOrg = await getCurrentOrg()

    await shutdownOrganization({ org: currentOrg! })

    redirect('/')
  }
  return (
    <form action={shutdownOrganizationAction}>
      <Button
        type="submit"
        variant="destructive"
        className="w-56 cursor-pointer"
      >
        <XCircle className="mr-r size-4" />
        Shutdown organization
      </Button>
    </form>
  )
}
