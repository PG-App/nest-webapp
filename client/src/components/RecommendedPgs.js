import React, { Fragment, useState, useEffect } from 'react';

export const RecommendedPg = ({ recommendedPgs }) => {
    return (
        <Fragment>
            <h4>Recommended PGs</h4>
            {JSON.stringify(recommendedPgs)}
        </Fragment>
    )
}