import * as React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import View from '.'

// Also test convertRef on next case

describe('View', () => {
  it('snapshot', () => {
    const component = mount(
      <View data-a="aaa">
        <div className="222" />
      </View>
    )

    expect(toJSON(component)).toMatchSnapshot()
  })

  it('pass dom props', () => {
    const component = mount(
      <View className="111">
        <div ref={React.createRef()} />
      </View>
    )

    expect(component.find('div').prop('className')).toBe('111')
  })

  it('View > child', () => {
    const component = mount(
      <View className="111">
        <div className="222" ref={() => null} />
      </View>
    )

    expect(component.find('div').prop('className')).toBe('111')

    // 删除测试
    component.unmount()
  })
})
