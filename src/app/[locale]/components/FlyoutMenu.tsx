'use client'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FC } from 'react'
import {
  ChartPieIcon,
  FingerPrintIcon,
  ShieldCheckIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import { Link } from '@/src/navigation'
interface Props {
  locale: string
}

const solutions = [
  { name: 'AES', description: 'Enkripsi dan dekripsi data dengan AES', href: `/AES`, icon: ChartPieIcon },
  { name: 'RSA', description: "Enkripsi dan dekripsi menggunakan RSA.", href: `/RSA`, icon: FingerPrintIcon },
  { name: 'Hybrid', description: 'Hybrid Cryptography, Gabungkan AES dan RSA.', href: `/Hybrid`, icon: ShieldCheckIcon },
  { name: 'Documentation', description: 'Pelajari algoritma AES, RSA, dan Hybrid Cryptography.', href: `/Documentation`, icon: BookOpenIcon },
]

export const FlyoutMenu : FC<Props> = ({ locale }) => {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1">
        <span>Feature</span>
        <ChevronDownIcon aria-hidden="true" className="size-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">

            {/*AES ELEMENT*/}
            <div key={'AES'} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div
                className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <ChartPieIcon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
              </div>
              <div>
                <Link lang={locale} href={'/AES'} className="font-semibold text-gray-900">
                  AES
                  <span className="absolute inset-0" />
                </Link>
                <p className="mt-1 text-gray-600">Enkripsi dan dekripsi data dengan AES</p>
              </div>
            </div>

            {/*RSA ELEMENT*/}
            <div key={'RSA'} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div
                className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <FingerPrintIcon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
              </div>
              <div>
                <Link lang={locale} href={'/RSA'} className="font-semibold text-gray-900">
                  RSA
                  <span className="absolute inset-0" />
                </Link>
                <p className="mt-1 text-gray-600">Enkripsi dan dekripsi data menggunakan RSA</p>
              </div>
            </div>

            {/*Hybrid ELEMENT*/}
            <div key={'Hybrid'} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div
                className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <ShieldCheckIcon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
              </div>
              <div>
                <Link lang={locale} href={'/Hybrid'} className="font-semibold text-gray-900">
                  Hybrid
                  <span className="absolute inset-0" />
                </Link>
                <p className="mt-1 text-gray-600">Hybrid Cryptography, Gabungkan AES dan RSA.</p>
              </div>
            </div>

            {/*Documentation ELEMENT*/}
            <div key={'Documentation'} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div
                className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <BookOpenIcon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
              </div>
              <div>
                <Link lang={locale} href={'/Documentation'} className="font-semibold text-gray-900">
                  Documentation
                  <span className="absolute inset-0" />
                </Link>
                <p className="mt-1 text-gray-600">Pelajari algoritma AES, RSA, dan Hybrid Cryptography.</p>
              </div>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
