'use client'

import dayjs from 'dayjs'

import 'dayjs/locale/ko'

import { useState } from 'react'
import Image from 'next/image'
import classnames from 'classnames'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'

import Input from '@/components/Input'
import Textarea from '@/components/Textarea'

interface State {
  name: string
  email: string
  memo: string
}

export default function WidgetScheduling() {
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [step, setStep] = useState<number>(1)
  const { register, handleSubmit } = useForm<State>()

  const onSubmit = async (data: State) => {
    if (!window.confirm('요청하시겠습니까?')) return
  }
  return (
    <li className="col-span-3 row-span-3 hidden h-[605px] w-full space-x-8 divide-x overflow-auto overscroll-contain rounded-3xl border border-neutral-200 p-6 xl:flex">
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border">
            <Image
              src="/google-meet.png"
              alt="google-meet"
              height={24}
              width={24}
            />
          </span>
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border"
            >
              <ArrowLeft size={20} />
            </button>
          )}
        </div>
        <div className="mt-3">
          <span className="text-sm">화상 미팅</span>
          <p className="mt-1 line-clamp-1 text-xs text-neutral-400">
            30분 정도 가능합니다.
          </p>
        </div>
        <div className="mt-4 w-full flex-1">
          {step === 1 ? (
            <>
              <div className="flex items-center justify-between">
                <span className="select-none text-xl">2023년 7월</span>
                <div className="flex">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full duration-150 hover:bg-neutral-50">
                    <ChevronLeft />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full duration-150 hover:bg-neutral-50">
                    <ChevronRight />
                  </button>
                </div>
              </div>
              <table className="mt-6">
                <thead>
                  <tr>
                    {['일', '월', '화', '수', '목', '금', '토'].map((v, i) => (
                      <th key={i}>
                        <div className="flex h-10 w-10 select-none items-center justify-center">
                          {v}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        1
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        2
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        3
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        4
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        5
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        6
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        7
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        8
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        9
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        10
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        11
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        12
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        13
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        14
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        15
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        16
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        17
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        18
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        19
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        20
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        21
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        22
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        23
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        24
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        25
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        26
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        27
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        28
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        29
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        30
                      </div>
                    </td>
                    <td>
                      <div className="flex h-10 w-10 select-none items-center justify-center">
                        31
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4">
                <button>대한민국/서울 (13:35)</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-10">
              <Input
                placeholder="이름"
                required
                register={register('name', { required: true })}
              />
              <Input
                placeholder="이메일"
                type="email"
                required
                register={register('email', { required: true })}
              />
              <Textarea placeholder="남기는 메모" register={register('memo')} />
              <button className="flex h-11 w-52 items-center justify-center rounded-[10px] bg-neutral-900 text-neutral-50">
                요청하기
              </button>
            </form>
          )}
        </div>
      </div>
      {step === 1 && (
        <div className="flex w-full select-none flex-col pl-8">
          <div className="text-2xl font-bold">시간 선택</div>
          <div className="mt-1">7월 6일 목요일</div>
          <ul className="mt-6 flex-1 space-y-3 overflow-auto overscroll-contain">
            {[
              '09:30',
              '10:00',
              '10:30',
              '11:00',
              '11:30',
              '12:00',
              '12:30',
              '13:00',
              '13:30',
              '14:00',
              '14:30',
              '15:00',
              '15:30',
              '16:00',
              '16:30',
              '17:00',
              '17:30',
              '18:00',
              '18:30',
              '19:00',
              '19:30',
              '20:00'
            ].map((item, key) => (
              <li
                key={key}
                onClick={() => setTime(item)}
                className={classnames(
                  'flex h-[58px] cursor-pointer items-center justify-between rounded border py-2 pl-6 pr-4 hover:border-neutral-500',
                  item === time
                    ? 'border-neutral-500 bg-neutral-900 text-neutral-50'
                    : ''
                )}
              >
                <span>{item}</span>
                <button
                  onClick={() => setStep(2)}
                  className={classnames(
                    'h-10 rounded-md px-4',
                    item === time
                      ? 'inline-block bg-neutral-50 font-semibold text-neutral-900'
                      : 'hidden'
                  )}
                >
                  선택
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}
