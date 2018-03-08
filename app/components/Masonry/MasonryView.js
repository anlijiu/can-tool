import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Masonry, createMasonryCellPositioner, WindowScroller, CellMeasurer, CellMeasurerCache, Grid, List, AutoSizer } from 'react-virtualized';
import DelegatesManager, { Delegate } from './DelegatesManager'
import styles from './MasonryView.css'


export default class MasonryView extends PureComponent {
  static propTypes = {
    list: PropTypes.array.isRequired,
    delegatesMap: PropTypes.object,
    itemView: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this._columnCount = 0;

    if(!this.props.itemView) {
      this.delegatesManager = new DelegatesManager();
      this.props.delegatesMap.forEach((value, key, map) => this.delegatesManager.addDelegate(key, value))
    }

    this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 200,
      fixedWidth: true,
      fixedHeight: true
    });

    this._columnHeights = {};

    this.state = {
      columnWidth: 200,
      height: 300,
      gutterSize: 10,
      windowScrollerEnabled: true
    };

    this._cellRenderer = this._cellRenderer.bind(this);
    this._onResize = this._onResize.bind(this);
    this._renderAutoSizer = this._renderAutoSizer.bind(this);
    this._renderMasonry = this._renderMasonry.bind(this);
  }

  render() {
    const {
      columnWidth,
      height,
      gutterSize,
      windowScrollerEnabled
    } = this.state;

    let child = (
        <WindowScroller>
          {this._renderAutoSizer}
        </WindowScroller>
      );


    return (
      <div>
        {child}
      </div>
    );
  }

  _calculateColumnCount() {
    const { columnWidth, gutterSize } = this.state;

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
  }

  _cellRenderer({ index, key, parent, style }) {
    const { list, itemView } = this.props;
    const { columnWidth } = this.state;

    const item = list[index];
    const ItemComponent = itemView ? itemView : this.delegatesManager.getComponent(list, index)

    console.log(index)
    console.log(this.props)
    console.log(list)

    console.log(ItemComponent)
    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        { ({ measure }) => (
        <div
          className={styles.Cell}
          style={{
            ...style,
            width: columnWidth
          }}
        >
          <div
            style={{
              borderRadius: "0.5rem",
              marginBottom: "0.5rem",
              width: "100%"
            }}
          />
           <div>
             <ItemComponent
               item={item}
               measure={measure}
             />
           </div>
        </div>
        )}
      </CellMeasurer>
    );
  }

  _initCellPositioner() {
    if (typeof this._cellPositioner === "undefined") {
      const { columnWidth, gutterSize } = this.state;

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize
      });
    }
  }

  _onResize({ width }) {
    this._width = width;

    this._columnHeights = {};
    this._calculateColumnCount();
    this._resetCellPositioner();
  }

  _renderAutoSizer({ height, scrollTop }) {
    this._height = height;
    this._scrollTop = scrollTop;

    return (

      <AutoSizer
        disableHeight
        onResize={this._onResize}
        scrollTop={this._scrollTop}
      >
        {this._renderMasonry}
      </AutoSizer>
    );
  }

  _renderMasonry({ width }) {
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const { height, windowScrollerEnabled } = this.state;

    return (
      <div className={styles.AutoSizerWrapper}>
        <AutoSizer disableHeight>
          {({width}) => (
            <List
              className={styles.List}
              rowCount={list.size}
              rowHeight={30}
              rowRenderer={this._rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }


  _rowRenderer = ({index, parent, key, style}: RowRendererParams) => {
    const { list, itemView } = this.props;
    const ItemComponent = itemView ? itemView : this.delegatesManager.getComponent(list, index)
    const row = list.get(index);
    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        {
          ({measure}) => (
            <div>
              <ItemComponent
                item={item}
                measure={measure}
              />
            </div>

          )
        }
      </CellMeasurer>
    )
  };
}
