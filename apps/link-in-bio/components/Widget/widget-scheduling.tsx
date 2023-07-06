'use client'

import { useEffect, useState } from 'react'
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
  const [date, setDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [step, setStep] = useState<number>(1)
  const [currentTime, setCurrentTime] = useState('')
  const { register, handleSubmit } = useForm<State>()

  const onSubmit = async (data: State) => {
    if (!window.confirm('요청하시겠습니까?')) return
  }

  const changeMonth = (amount: number) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const newDate = new Date(date.getFullYear(), date.getMonth() + amount, 1)

    if (
      newDate.getFullYear() > currentYear ||
      (newDate.getFullYear() === currentYear &&
        newDate.getMonth() >= currentMonth)
    ) {
      setDate(newDate)
    }
  }

  const isPastDate = (day: number) => {
    const today = new Date()
    return (
      day < today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isPreviousMonthDisabled = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    if (
      date.getFullYear() === currentYear &&
      date.getMonth() === currentMonth
    ) {
      return true
    }

    return false
  }

  const render = () => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()

    const rows = []
    let days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <td key={`empty-${i}`}>
          <div className="h-10 w-10"></div>
        </td>
      )
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isPast = isPastDate(day)
      const isSelected = selectedDate
        ? day === selectedDate.getDate() &&
          month === selectedDate.getMonth() &&
          year === selectedDate.getFullYear()
        : false
      days.push(
        <td key={`day-${day}`}>
          <button
            className={classnames(
              'flex h-10 w-10 select-none items-center justify-center rounded-full duration-150',
              isPast
                ? 'cursor-text text-neutral-200'
                : isSelected
                ? 'bg-neutral-900 text-neutral-50'
                : 'bg-neutral-100 hover:bg-neutral-200'
            )}
            onClick={() => setSelectedDate(new Date(year, month, day))}
          >
            {day}
          </button>
        </td>
      )

      if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
        rows.push(<tr key={`row-${day}`}>{days}</tr>)
        days = []
      }
    }

    return rows
  }

  const padZero = (value: number) => {
    return value.toString().padStart(2, '0')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()

      const timeString = `${padZero(hours)}:${padZero(minutes)}`
      setCurrentTime(timeString)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
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
                <span className="select-none text-xl">
                  {date.toLocaleString('default', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => changeMonth(-1)}
                    className={classnames(
                      'flex h-10 w-10 items-center justify-center rounded-full',
                      isPreviousMonthDisabled()
                        ? 'text-neutral-200'
                        : 'duration-150 hover:bg-neutral-50'
                    )}
                    disabled={isPreviousMonthDisabled()}
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={() => changeMonth(1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full duration-150 hover:bg-neutral-50"
                  >
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
                <tbody>{render()}</tbody>
              </table>
              <div className="mt-4">
                {!!currentTime && (
                  <button className="font-bold text-neutral-800">
                    대한민국/서울 ({currentTime})
                  </button>
                )}
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-10">
              <Input
                placeholder="이름"
                required
                autoFocus
                register={register('name', { required: true })}
              />
              <Input
                placeholder="이메일"
                type="email"
                required
                register={register('email', { required: true })}
              />
              <Textarea placeholder="남길 메모" register={register('memo')} />
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
          <div className="mt-1">
            {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일{' '}
            {['일', '월', '화', '수', '목', '금', '토'][selectedDate.getDay()]}
            요일
          </div>
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
                onClick={() => setSelectedTime(item)}
                className={classnames(
                  'flex h-[58px] cursor-pointer items-center justify-between rounded border py-2 pl-6 pr-4',
                  item === selectedTime
                    ? 'border-neutral-900 bg-neutral-900 text-neutral-50'
                    : 'hover:border-neutral-500'
                )}
              >
                <span>{item}</span>
                <button
                  onClick={() => setStep(2)}
                  className={classnames(
                    'h-10 rounded-md px-4',
                    item === selectedTime
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
