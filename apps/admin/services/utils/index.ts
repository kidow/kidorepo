import { EventListener } from 'services'

export const backdrop = (open: boolean) => EventListener.emit('backdrop', open)
