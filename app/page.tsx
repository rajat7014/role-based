// import Image from 'next/image'
// import DashboardPage from './dashboard/page'
// import { render, screen } from '@testing-library/react'

// export default function Home() {
//   return <><DashboardPage />
//   expect(screen.getByText('Loading...')).toBeInTheDocument()
//   </>
// }

import { render, screen } from '@testing-library/react'
import DashboardPage from './dashboard/page'
import test from 'node:test'
import expect from 'expect'

test('Shows loading initially', () => {
  render(<DashboardPage />)
  expect(screen.getByText('Loading...')).toBeInTheDocument()
})
