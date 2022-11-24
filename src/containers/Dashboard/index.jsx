/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
// import Revenue from './Component/Revenue';
// import RegisteredUser from './Component/RegisteredUser';
import CardComponent from './Component/Card';
// import ComponentContinent from 'components/ComponentContinent';
import DateRangePicker from 'components/DateRangePicker';
// import AreaChartComponent from 'components/AreaChartComponent';
import { withBiViewModel } from 'store/BiStore/BiViewModelContextProvider';
// import {
//   BI_DASHBOARD_FIELD_KEY,
//   BI_NEW_USERS_KEY,
//   BI_CONTINENTS_KEY,
// } from 'aesirx-dma-lib/src/Constant/BiConstant';
import SummaryStore from 'store/SummaryStore/SummaryStore';
import SummaryViewModel from 'store/SummaryStore/SummaryViewModel';
import { SummaryStoreProvider } from 'store/SummaryStore/SummaryViewModelContextProvider';
import { withRouter } from 'react-router-dom';
const summaryStore = new SummaryStore();
const summaryViewModel = new SummaryViewModel(summaryStore);
const Dashboard = observer(
  class Dashboard extends Component {
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.biListViewModel = this.viewModel ? this.viewModel.biListViewModel : null;
    }

    componentDidMount() {
      let fetchData = async () => {
        if (this.props.history.location.pathname === '/' || !this.props.history.location.pathname) {
          this.props.history.push(`/data-${this.biListViewModel.activeDomain}`);
        }
      };
      fetchData();
    }

    render() {
      const { t } = this.props;
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <div className="position-relative">
              <h2 className="text-blue-0 fw-bold mb-8px">{t('txt_dashboard')}</h2>
              <p className="mb-0 text-color">{t('txt_dashboard_below')}</p>
            </div>
            <div className="position-relative">
              <DateRangePicker
                viewModelArr={[summaryViewModel.summaryListViewModel]}
              ></DateRangePicker>
            </div>
          </div>
          <SummaryStoreProvider viewModel={summaryViewModel}>
            <CardComponent></CardComponent>
          </SummaryStoreProvider>
          {/* <div className="row gx-24 mb-24">
            <div className="col-lg-7">
              <AreaChartComponent
                chartTitle={t('txt_total_revenue')}
                height={390}
                data={[
                  {
                    name: 'Jan',
                    line1: 400,
                  },
                  {
                    name: 'Feb',
                    line1: 530,
                  },
                  {
                    name: 'Mar',
                    line1: 410,
                  },
                  {
                    name: 'Apr',
                    line1: 395,
                  },
                  {
                    name: 'May',
                    line1: 380,
                  },
                  {
                    name: 'Jun',
                    line1: 204,
                  },
                  {
                    name: 'Jul',
                    line1: 420,
                  },
                  {
                    name: 'Aug',
                    line1: 680,
                  },
                  {
                    name: 'Sep',
                    line1: 670,
                  },
                  {
                    name: 'Oct',
                    line1: 568,
                  },
                  {
                    name: 'Nov',
                    line1: 940,
                  },
                  {
                    name: 'Dec',
                    line1: 360,
                  },
                ]}
                colors={['#1AB394']}
                lineType="monotone"
                areaColors={['#3BB346', 'pink']}
                lineColors={['#0FC6C2', 'red']}
                lines={['line1']}
                isDot
                hiddenGrid={{ vertical: false }}
                XAxisOptions={{ axisLine: true, padding: { left: 20, right: 10 } }}
                 tooltipComponent={{
                  header: t('txt_in_total'),
                  value: `$`,
                }}
              />
            </div>
            <div className="col-lg-5">
              <Revenue
                data={this.biListViewModel.data[BI_DASHBOARD_FIELD_KEY.REVENUE_BY_SUBSCRIBERS]}
              ></Revenue>
            </div>
          </div>
          <div className="row gx-24 mb-24">
            <div className="col-lg-6">
              <RegisteredUser
                data={this.biListViewModel.data[BI_NEW_USERS_KEY.NEW_USERS]}
              ></RegisteredUser>
            </div>
            <div className="col-lg-6">
              <ComponentContinent
                data={this.biListViewModel.data[BI_CONTINENTS_KEY.CONTINENTS]}
              ></ComponentContinent>
            </div>
          </div> */}
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withBiViewModel(Dashboard)));
