import { makeStyles } from '@material-ui/core';
import { Divider, Grid, Typography } from '@material-ui/core';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },
    },
}));

export const PopularLocalities = ({ popularLocalitiesPgs }) => {
    const classes = useStyles();
    return (
        <Fragment>
            <h4>PopularLocalities PGs</h4>
            {/* {popularLocalitiesPgs && JSON.stringify(popularLocalitiesPgs)} */}
            {/* {popularLocalitiesPgs &&
                popularLocalitiesPgs.map(pg => (
                    <div>
                        <p>
                            {pg.location.split(' ')[0]} {' '}
                            {pg.location.split(' ')[1]}
                        </p>
                    </div>
                ))
            } */}

            <Grid container alignItems='center' className={classes.root}>
                <Typography variant='p'>
                <Link to='/pgs?location=Paltan Bazaar'>
                    <LocationCityIcon fontSize='default' />
                    <Typography variant='h6'> Paltan Bazaar </Typography>
                </Link>
                </Typography>

                <Divider orientation="vertical" flexItem />

                <Link to='/pgs?location=Bamunimaidan'>
                    <LocationCityIcon fontSize='default' />
                    <Typography variant='h6'>Bamunimoidam</Typography>
                </Link>

                <Divider orientation="vertical" flexItem />

                <Link to='/pgs?location=Dibrugarh University'>
                    <LocationCityIcon fontSize='default' />
                    <Typography variant='h6'>Dibrugarh University</Typography>
                </Link>

                <Divider orientation="vertical" flexItem />

                <Link to='/pgs?location=Fancy Bazaar'>
                    <LocationCityIcon fontSize='default' />
                    <Typography variant='h6'>Fancy Bazaar</Typography>
                </Link>

            </Grid>
        </Fragment>
    )
}