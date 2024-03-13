import React from 'react';
import styled from 'styled-components';
import { FaCheck } from "react-icons/fa";
import { useFilterContext } from '../context/FilterContextProvider';
import FormatPrice from '../Helpers/FormatPrice';
import { Button } from '../styles/Button';

const FilterSection = () => {
  const {
    filters: { text, category, color, maxPrice, minPrice, price, company },
    updateFilterValue,
    clearFilters,
    all_Products
  } = useFilterContext();

  // TO GET THE UNIQUE DATA OF EACH FIELDS
  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property];
    });

    if (property === 'colors') {
      return newVal = ['all', ...new Set([].concat(...newVal))];
    } else {
      return newVal = ["all", ...new Set(newVal)];
    }

  };

  // We NEED UNIQUE DATA
  const categoryData = getUniqueData(all_Products, 'category');
  const companyData = getUniqueData(all_Products, 'company');
  const colorsData = getUniqueData(all_Products, 'colors');

  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name='text'
            value={text}
            onChange={updateFilterValue}

            placeholder='SEARCH'
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {
            categoryData.map((CurElem, ind) => {
              return <button
                key={ind}
                type='button'
                name='category'
                value={CurElem}
                className={CurElem === category ? 'active' : ''}
                onClick={updateFilterValue}
              >
                {CurElem}
              </button>
            })
          }
        </div>
      </div>

      {/* company fields */}

      <h3>Company</h3>
      <form action="#">
        <select name="company" id="company" className='filter-company--select'
          onChange={updateFilterValue}
          value={company}
          style={{border: '1px solid #ccc'}}
        >
          {
            companyData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name='company'>
                  {curElem}
                </option>
              )
            })
          }
        </select>
      </form>

      {/* color fieds */}
      <div className="filter-colors colors">
        <h3>Colors</h3>

        <div className="filter-color-style">
          {
            colorsData.map((curColor, ind) => {
              if (curColor === 'all') {
                return <button
                  key={ind}
                  type='button'
                  name='color'
                  value={curColor}
                  className='color-all--style'
                  onClick={updateFilterValue}
                >
                  All
                </button>
              }

              return <button
                key={ind}
                type='button'
                name='color'
                value={curColor}
                className={color === curColor ? 'btnStyle active' : 'btnStyle'}
                onClick={updateFilterValue}
                style={{ background: curColor }}
              >
                {color === curColor ? <FaCheck className='checkStyle' /> : null}
              </button>
            })
          }
        </div>
        {/* filter by price */}
        <div className="filter_price">
          <h3>Price</h3>
          <p><FormatPrice price={price} /></p>
          <input type="range"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={updateFilterValue}
            name="price" />
        </div>

        <div className="filter-clear">
          <Button className='btn'
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>

      </div>
    </Wrapper >
  )
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;