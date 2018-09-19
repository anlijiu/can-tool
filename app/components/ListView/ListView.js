import React, { Component, PureComponent, PropTypes } from 'react'

import { denormalize } from 'normalizr';
import { Schemas } from 'schemas';
import { WindowScroller, CellMeasurer, CellMeasurerCache, Grid, List, AutoSizer } from 'react-virtualized';
import { isUndefined, isNull, isEmpty } from 'lodash';
import { compose, withPropsOnChange, defaultProps, withProps, renameProp, withHandlers, withState, pure, toClass, setDisplayName } from 'recompose'
import DelegatesManager from './DelegatesManager'
import s from './ListView.css';
import classNames from 'classnames/bind'
const cx = classNames.bind(s);

const styles = {
  btn: {
    height: 20,
  },
  icon: {
  },
  label: {
    fontSize: 7,
  },
};


let virtualList = null

const getRowHeight = (props) => ({index}) => {
  const { list, cache, ui } = props
  // const activeId = ui ? ui.activeId : null
  // console.log("getRowHeight sstart", list, activeId, props)
  const height = cache.rowHeight({index})
  // const activeIndex = list.findIndex( (element, index, array) => {
  //   console.log(element.id, activeId)
  //   return element.id === activeId
  // })

  // console.log("getRowHeight 222, ", activeIndex)
  // if(activeIndex == index) {
  //   console.log("getRowHeight 333")
  //   return 291
  // }

  return height
}

const rowRenderer = (props) => (params) =>{

  const { list, delegatesManager, cache, itemView} = props
  const { index , key, parent, style } = params

  const item = list[index]
  /**
   * 看到上面那个{style}了么， 必须传给item ，否则scroll闪烁, 麻辣隔壁搞了我两天
   * margin top/bottom cause problem in react-virtualized Windowscroller + cellmeasure
   * ,don't know why , so use minHeight:1rem
   */
  let ItemComponent = itemView ? itemView : delegatesManager.getComponent(list, index)
  if(!ItemComponent) {
    ItemComponent = (props) => (<div>no item container view</div>)
  }

  return (
      <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      parent={parent}
      rowIndex={index}
      >
      {({ measure }) => (
        <div className={s.row} style={style}>
          <ItemComponent
            key={`${key}-${index}`}
            item={item}
            measure={measure}
          />

        </div>
      )}
      </CellMeasurer>
    )
}

const renderList = (props) => (params) => {
  const {list,
    cache, rowRenderer,
    rowCount, getRowHeight,
    handleListRef,
  } = props
  const {
    height, width, onChildScroll,
    scrollTop, isScrolling,
  } = params

  return (
    <List
      list={list}
      className={s.List}
      ref={handleListRef}
      isScrolling={isScrolling}
      width={width}
      height={height}
      onChildScroll={onChildScroll}
      rowCount={rowCount}
      deferredMeasurementCache={cache}
      rowHeight={ getRowHeight }
      rowRenderer={ rowRenderer }
      scrollTop={scrollTop}
      autoHeight
    />
  )
}

const renderAutoSizer = (props) => (params) => {
  const {
    renderList,
    ...others1
  } = props
  const { height, listHeight, scrollTop, isScrolling, onChildScroll, registerChild, ...others2 } = params

  return (
    <div className={s.AutoSizerWrapper}>
      <AutoSizer
        disableHeight
      >
        {
          ({width}) => (
            <div ref={registerChild}>
              {renderList({height, width, onChildScroll, isScrolling, scrollTop})}
            </div>
          )
        }
      </AutoSizer>
    </div>
    );
}


const ListView = (props) => {
  const {
    list,
    defaultItemHeight,
    windowScrollerEnabled,
    listHeight,
    delegatesMap,
    renderAutoSizer,
    itemView,
    ref,
    setRef,
    listRef,
    rowCount,
    getRowHeight,
    rowRenderer,
    forceUpdate,
    delegatesManager
  } = props


  if(!itemView) {
    delegatesMap.forEach((value, key, map) => delegatesManager.addDelegate(key, value))
  }

  let child = windowScrollerEnabled ?
    (
      <WindowScroller
        ref={setRef}
        scrollElement={window}>
        {renderAutoSizer}
      </WindowScroller>
    ) : (
      <div className={s.AutoSizerWrapper}>

        <AutoSizer>
          {
            ({width, height}) => {
              // console.log("width       is ", width, " height is ", height, "rowCount is ", rowCount)
              return (
                <List
                  // list={list}
                  className={s.List}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={getRowHeight}
                  rowRenderer={rowRenderer}
                  width={width}
                />
              )
            }
          }
        </AutoSizer>
      </div>
    )

  return (
      child
  );
}

export default compose(
  pure,
  defaultProps({
    delegatesManager: new DelegatesManager(),
  }),
  withProps(({height, list, defaultItemHeight}) => ({
    listHeight: height,
    rowCount: list.length,
    cache: new CellMeasurerCache({
      defaultHeight: defaultItemHeight ? defaultItemHeight : 75,
      fixedWidth: true,
    }),
  })),
  withState('ref', 'setRef', 0),
  withState('listRef', 'setListRef', null),
  withHandlers({
    handleListRef: ({ setListRef }) => ref => {
      if (ref) {
        setListRef(ref);
      }
    }
  }),
  withHandlers({
    rowRenderer: rowRenderer,
  }),
  withHandlers({
    getRowHeight: getRowHeight,
  }),
  withHandlers({
    renderList: renderList,
  }),
  withHandlers({
    renderAutoSizer: renderAutoSizer,
  }),
)(ListView)
