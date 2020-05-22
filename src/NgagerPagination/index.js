/* eslint no-lonely-if: 0 */
/* eslint no-mixed-operators: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class NgagerPagination extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: props.defaultPage,
    }
  }

  // componentWillReceiveProps({ defaultPage }) {
  //   if (defaultPage !== this.props.defaultPage) {
  //     this.setState({ page: this.props.defaultPage });
  //   }
  // }

  setPage(page) {
    this.setState({ page });
    this.props.onChangePage(page);
  }

  renderNumbers() {
    const self = this;
    const numbers = [];
    const totalPagesCount = this.props.totalPages;
    const offset = 5; // the number of pages to display before and after the current page, for example of set to two then it will display two numbers before the current page number and 2 numbers after the current page number
    const currentPageOrder = this.state.page;

    for (let i = 1; i <= totalPagesCount; i += 1) {
      if (i <= 10 && currentPageOrder <= offset + 1) {
        // rendering the first 10
        numbers.push(
          <span
            key={Math.random()}
            role="button"
            tabIndex={0}
            onClick={() => self.setPage(i)}
            className={i === currentPageOrder ? 'number active' : 'number'}
          >
            {i}
          </span>,
        );
      } else {
        if (
          (i < currentPageOrder && currentPageOrder - i <= offset) ||
          (i - currentPageOrder <= offset && i >= currentPageOrder)
        ) {
          numbers.push(
            <span
              key={Math.random()}
              role="button"
              tabIndex={0}
              onClick={() => self.setPage(i)}
              className={i === currentPageOrder ? 'number active' : 'number'}
            >
              {i}
            </span>,
          );
        }
      }
    }
    return <span className="numbersContainer">{numbers}</span>;
  }

  renderPaginationStatistics() {
    const pageSize = this.props.pageSize;
    if (this.state.page === this.props.totalPages) {
      // if we're on the last page
      const lastPageItemCount = this.props.totalCount - (this.props.totalPages - 1) * pageSize;
      return (
        <p className="paginationStatistics">{`${pageSize * this.state.page -
          pageSize +
          1} - ${(this.props.totalPages - 1) * pageSize + lastPageItemCount} of ${
          this.props.totalCount
        }`}</p>
      );
    }
    return (
      <p className="paginationStatistics">{`${pageSize * this.state.page -
        pageSize +
        1} - ${pageSize * this.state.page} of ${this.props.totalCount}`}</p>
    );
  }

  render() {
    if (this.props.totalPages === 1) {
      return null;
    }
    return (
      <Container className={this.props.className}>
        <div style={{ display: 'inline-block' }}>
          <i
            role="button"
            tabIndex={0}
            onClick={() => this.setPage(1)}
            className={
              this.state.page > 1
                ? 'fa fa-angle-double-left'
                : 'disabledPaginationLink fa fa-angle-double-left'
            }
            aria-hidden="true"
          ></i>
          <i
            role="button"
            tabIndex={0}
            onClick={() => this.setPage(this.state.page - 1)}
            aria-hidden="true"
            className={
              this.state.page > 1
                ? 'fa fa-caret-left'
                : 'disabledPaginationLink fa fa-caret-left'
            }
          ></i>
          {this.props.displayPages ? (
            this.renderNumbers()
          ) : (
            <span className="paginationStatisticsContainer">
              {this.renderPaginationStatistics()}
            </span>
          )}
          <i
            role="button"
            tabIndex={0}
            onClick={() => this.setPage(this.state.page + 1)}
            aria-hidden="true"
            className={
              this.state.page === this.props.totalPages
                ? 'disabledPaginationLink fa fa-caret-right'
                : 'fa fa-caret-right'
            }
          ></i>
          <i
            role="button"
            tabIndex={0}
            onClick={() => this.setPage(this.props.totalPages)}
            className={
              this.state.page === this.props.totalPages
                ? 'disabledPaginationLink fa fa-angle-double-right'
                : 'fa fa-angle-double-right'
            }
            aria-hidden="true"
          ></i>
          {this.props.displayPages && this.renderPaginationStatistics()}
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  text-align: center;
  display: block;
  width: 100%;

  .numbersContainer {
    display: inline-block;
    border-bottom: 2px solid #e2e8f7;
  }

  .disabledPaginationLink {
    color: #ced1da;
    pointer-events: none;
  }

  .paginationStatistics {
    color: #c3cadc;
    font-size: 9px;
    margin-top: 4px;
  }

  .paginationStatisticsContainer {
    display: inline-block;

    .paginationStatistics {
      font-size: 1em;
      color: #778091;
    }
  }

  .number, i {
    cursor: pointer;
    background: none;
    position: relative;
    color: #778091;
    outline: none;
    width: 30px;
    height: 30px;
    line-height: 30px;
    padding: 0;
    display: inline-block;
  }

  i {
    font-size: 14px;
  }

  .number.active::before, .number:hover::before {
    width: 30px;
    height: 4px;
    content: "";
    background-color: #5186ed;
    position: absolute;
    bottom: -3px;
    left: 0;
  }

  .fa-caret-left {
    margin-right: 10px;
  }

  .fa-caret-right {
    margin-left: 10px;
  }
`

NgagerPagination.propTypes = {
  pageSize: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onChangePage: PropTypes.func,
  defaultPage: PropTypes.number,
  displayPages: PropTypes.bool,
  className: PropTypes.string,
};

NgagerPagination.defaultProps = {
  pageSize: 30,
  defaultPage: 1,
  onChangePage: (p) => console.log(p),
  displayPages: true,
  className: '',
};

export default NgagerPagination;
