/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxApiInstance from 'aesirx-dma-lib/src/gateway/Instance';
import BaseRoute from 'aesirx-dma-lib/src/Abstract/BaseRoute';

class PimDebtorGroupRoute extends BaseRoute {
  option = 'reditem-item_debtor_group_52';

  getList = (filters = {}) => {
    const buildFilters = this.createFilters(filters);
    return AesirxApiInstance().get(
      this.createRequestURL({
        option: this.option,
        ...buildFilters,
      })
    );
  };

  createFilters = (filters) => {
    let buildFilter = {};
    for (const [key, value] of Object.entries(filters)) {
      if (typeof value === 'object') {
        switch (value.type) {
          case 'custom_fields':
            buildFilter['filter[' + value.type + '][' + key + '][]'] = value.value;
            break;
          case 'filter':
            buildFilter['filter[' + key + ']'] = value.value;
            break;
          default:
            break;
        }
      } else {
        buildFilter[key] = value;
      }
    }

    return buildFilter;
  };

  getDetail = (id = 0, filter = {}) => {
    return AesirxApiInstance().get(
      this.createRequestURL({
        option: this.option,
        id: id,
        ...filter,
      })
    );
  };

  create = (data) => {
    return AesirxApiInstance().post(
      this.createRequestURL({
        option: this.option,
      }),
      data
    );
  };
  
  update = (data) => {
    return AesirxApiInstance().put(
      this.createRequestURL({
        option: this.option,
      }),
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  };

  updateStatus = (listSelected) => {
    return AesirxApiInstance().post(
      this.createRequestURL({
        option: this.option,
        task: 'bulkUpdate',
      }),
      {
        items: listSelected,
      }
    );
  };

  delete = (id) => {
    return AesirxApiInstance().delete(
      this.createRequestURL({
        option: this.option,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: { id: id },
      }
    );
  };
}

export default PimDebtorGroupRoute;
