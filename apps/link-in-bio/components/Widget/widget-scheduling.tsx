'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Spinner } from 'ui'
import { cn, toast } from 'utils'

import Input from '@/components/Input'
import Textarea from '@/components/Textarea'

interface State {
  name: string
  email: string
  memo: string
  additionalEmail: string
}

export default function WidgetScheduling() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [step, setStep] = useState<number>(1)
  const [currentTime, setCurrentTime] = useState('')
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const [isAdditionalOpen, setIsAdditionalOpen] = useState<boolean>(false)
  const { register, handleSubmit, reset } = useForm<State>()

  const onSubmit = async (data: State) => {
    if (!window.confirm('요청하시겠습니까? 조금 시간이 걸립니다.')) return
    if (!data.name || !data.email || !data.memo || !selectedTime) return

    const datetime = dayjs()
      .locale('ko')
      .set('year', selectedDate.getFullYear())
      .set('month', selectedDate.getMonth())
      .set('date', selectedDate.getDate())
      .set('hour', Number(selectedTime.slice(0, 2)))
      .set('minute', Number(selectedTime.slice(-2)))
      .toISOString()

    const payload: any = {
      name: data.name,
      email: data.email,
      memo: data.memo,
      datetime
    }

    if (dayjs(datetime).startOf('hour').isBefore(new Date())) {
      toast.error(
        '이전 시간은 예약할 수 없습니다. 시간 여유를 두고 예약해주세요.'
      )
      return
    }

    if (isAdditionalOpen && data.additionalEmail) {
      if (
        !data.additionalEmail
          .split(', ')
          .every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      ) {
        toast.error('유효하지 않은 이메일이 있습니다.')
        return
      }
      payload.additionalEmail = data.additionalEmail
    }

    setIsRequesting(true)
    const res = await fetch('/api/meeting', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    })
    const result = await res.json()
    if (result.success) {
      toast.success('요청되었습니다. 곧 회신하겠습니다. 🤗')
      setSelectedDate(new Date())
      setSelectedTime('')
      setStep(1)
      setDate(new Date())
      setIsAdditionalOpen(false)
      reset()
    } else
      toast.error('죄송합니다. 요청이 실패했습니다. 나중에 다시 시도해주세요.')
    setIsRequesting(false)
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

  const convertTo12HourFormat = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const parsedHours = parseInt(hours, 10)
    const parsedMinutes = parseInt(minutes, 10)

    let period = '오전'
    let convertedHours = parsedHours

    if (parsedHours >= 12) {
      period = '오후'
      if (parsedHours > 12) {
        convertedHours = parsedHours - 12
      }
    }

    const convertedMinutes = parsedMinutes.toString().padStart(2, '0')
    const convertedTimeString = `${period} ${convertedHours}시 ${convertedMinutes}분`
    return convertedTimeString
  }

  const renderCalendar = () => {
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
            className={cn(
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
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()

    const timeString = `${padZero(hours)}:${padZero(minutes)}`
    setCurrentTime(timeString)

    const interval = setInterval(() => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()

      const timeString = `${padZero(hours)}:${padZero(minutes)}`
      setCurrentTime(timeString)
    }, 1000 * 60)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <>
      <li
        onClick={() =>
          window.open('https://whattime.co.kr/wcgo2ling/30min', '_blank')
        }
        className="col-span-3 row-span-3 hidden h-[605px] w-full cursor-pointer space-x-8 divide-x overflow-auto overscroll-contain rounded-3xl border border-neutral-200 p-6 xl:flex"
      >
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
              30분에서 1시간 가능합니다.
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
                      className={cn(
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
                      {['일', '월', '화', '수', '목', '금', '토'].map(
                        (v, i) => (
                          <th key={i}>
                            <div className="flex h-10 w-10 select-none items-center justify-center">
                              {v}
                            </div>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>{renderCalendar()}</tbody>
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-10"
              >
                <Input
                  placeholder="이름"
                  required
                  autoFocus
                  autoComplete="off"
                  register={register('name', { required: true })}
                />
                <div>
                  <Input
                    placeholder="이메일"
                    type="email"
                    required
                    autoComplete="off"
                    register={register('email', { required: true })}
                  />
                  {!isAdditionalOpen && (
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setIsAdditionalOpen(true)}
                      className="ml-2 mt-2 text-sm text-neutral-400 hover:text-neutral-600"
                    >
                      예약자 추가하기
                    </button>
                  )}
                </div>
                {isAdditionalOpen && (
                  <div>
                    <Textarea
                      placeholder="추가 예약자 이메일 (, )로 구분"
                      register={register('additionalEmail')}
                    />
                    <button
                      type="button"
                      onClick={() => setIsAdditionalOpen(false)}
                      className="ml-2 mt-2 text-sm text-neutral-400 hover:text-neutral-600"
                    >
                      {isAdditionalOpen ? '닫기' : '예약자 추가하기'}
                    </button>
                  </div>
                )}
                <Textarea
                  placeholder="남길 메모"
                  required
                  register={register('memo', { required: true })}
                />
                <div className="flex items-center gap-4">
                  <button
                    disabled={isRequesting}
                    className="flex h-11 w-52 items-center justify-center gap-2 rounded-[10px] bg-neutral-900 text-neutral-50 duration-150 disabled:cursor-not-allowed disabled:bg-neutral-400"
                  >
                    {isRequesting && <Spinner.v1 className="h-5 w-5" />}
                    <span>요청하기</span>
                  </button>
                  <div className="h-px flex-1 bg-neutral-200" />
                  <span className="text-neutral-500">
                    {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}
                    월 {selectedDate.getDate()}일{' '}
                    {convertTo12HourFormat(selectedTime)}
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
        {step === 1 && (
          <div className="flex w-full select-none flex-col pl-8">
            <div className="text-2xl font-bold">시간 선택</div>
            <div className="mt-1">
              {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일{' '}
              {
                ['일', '월', '화', '수', '목', '금', '토'][
                  selectedDate.getDay()
                ]
              }
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
                  className={cn(
                    'flex h-[58px] cursor-pointer items-center justify-between rounded border py-2 pl-6 pr-4',
                    item === selectedTime
                      ? 'border-neutral-900 bg-neutral-900 text-neutral-50'
                      : 'hover:border-neutral-500'
                  )}
                >
                  <span>{item}</span>
                  <button
                    onClick={() => {
                      if (selectedTime) setStep(2)
                    }}
                    className={cn(
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
    </>
  )
}
