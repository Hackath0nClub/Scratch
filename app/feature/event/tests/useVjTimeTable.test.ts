import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { renderHook } from '@testing-library/react'
import eventvj_json from './data/event_vj.json'
import { act } from 'react-dom/test-utils'
import * as eventVjRepository from '../infrastructure/eventVjRepository'
// 依存する関数をテスト対象のimportより先にモック化する
jest.mock('../infrastructure/eventVjRepository')
const selectEventVjByEventIdMock =
  eventVjRepository.selectEventVjByEventId as jest.Mock
import { useVjTable, VjTable } from '../hooks/useVjTimeTable'

let result: any
const main = () => {
  beforeEach(() => {
    result = renderHook(() => useVjTable()).result
    selectEventVjByEventIdMock.mockClear()
  })

  getVjTableInit({ expected_result: undefined })
  getVjTableTest({ id: 1, mock_output: mock1, expected_result: data1 })
  getVjTableTest({ id: 2, mock_output: mock2, expected_result: data2 })
  getVjTableTest({ id: 3, mock_output: mock3, expected_result: data3 })

  afterEach(() => {
    jest.restoreAllMocks()
  })
}

const mock1 = convertDateStringToDateObjectInList(eventvj_json[0])
const mock2 = convertDateStringToDateObjectInList(eventvj_json[1])
const mock3 = convertDateStringToDateObjectInList(eventvj_json[2])
const data1 = convertDateStringToDateObjectInList(eventvj_json[0])
const data2 = convertDateStringToDateObjectInList(eventvj_json[1])
const data3 = convertDateStringToDateObjectInList(eventvj_json[2])

type testCaseType = {
  id: number
  mock_output: VjTable
  expected_result: VjTable
}

const getVjTableTest = ({ id, mock_output, expected_result }: testCaseType) => {
  test('getVjTable id=' + id, async () => {
    selectEventVjByEventIdMock.mockImplementation(() => mock_output)
    await act(() => result.current.getVjTable(id))
    expect(result.current.vj_table).toStrictEqual(expected_result)
  })
}

const getVjTableInit = ({
  expected_result,
}: {
  expected_result: undefined
}) => {
  test('getVjTable init value', async () => {
    expect(result.current.vj_table).toStrictEqual(expected_result)
  })
}

main()
