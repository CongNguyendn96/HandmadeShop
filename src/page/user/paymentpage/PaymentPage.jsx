import React from 'react';
import PropTypes from 'prop-types';
import Pageroot from '../pageroot/Pageroot';
import { AccountUser, PaymentUser, SearchUser } from '../../../components';

PaymentPage.propTypes = {

};

function PaymentPage(props) {
    return (
        <div>
            <Pageroot account={<AccountUser />} cart={false}>
                <PaymentUser />
            </Pageroot>
        </div>
    );
}

export default PaymentPage;