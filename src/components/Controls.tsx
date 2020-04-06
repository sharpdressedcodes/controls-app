import React, { memo } from 'react';
import { Chip, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { COLOUR_CHIP, COLOUR_GREY_TEXT } from '../config/theme';

type ColumnStyleType = {
    fontSize?: string,
    letterSpacing?: string
};

type ColumnType = {
    id: string,
    label: string,
    align?: string,
    style?: ColumnStyleType,
    format?: Function
};

const columns: ColumnType[] = [
    { id: 'title', label: 'Title', style: { fontSize: '18px', letterSpacing: '0.03em' } },
    { id: 'type', label: 'Type' },
    { id: 'polar-angle', label: 'Polar Angle', style: { fontSize: '16px' } },
    { id: 'max-rabi-rate', label: 'Max Rabi Rate', style: { fontSize: '16px' } },
    { id: 'button', label: '', align: 'right' }
];

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    },
    table: {
        display: 'grid',
        gridGap: '3px 0',
        gridTemplateColumns: 'auto 70px',

        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'minmax(260px, 350px) minmax(110px, 200px) minmax(100px,170px) auto 70px'
        }
    },
    tableHeader: {
        backgroundColor: 'transparent',
        borderBottom: '1px solid #e6e4e8',
        color: COLOUR_GREY_TEXT,
        display: 'none',
        textTransform: 'uppercase',
        padding: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(2)}px`,

        [theme.breakpoints.up('md')]: {
            display: 'initial'
        }
    },
    tableCell: {
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`
    },
    firstRow: {
        marginTop: '-2px'
    },
    desktopOnlyCell: {
        display: 'none',

        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    chevronRight: {
        color: theme.palette.grey[500],
        fontSize: '24px',
        height: '32px',
        width: '32px'
    },
    chip: {
        backgroundColor: COLOUR_CHIP,
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.common.white,
        textTransform: 'uppercase',
        padding: `0 ${theme.spacing(1)}px`
    },
    placeHolder: {
        padding: theme.spacing(4),
        textAlign: 'center'
    }
}));

type ControlsProps = {
    data: any[]
};

const Controls = (props: ControlsProps) => {
    const { data } = props;
    const classes = useStyles();

    if (!data || !data.length) {
        return <div className={classes.placeHolder}>No data</div>;
    }

    return (
        <div className={classes.root}>

            <div className={classes.table}>
                {columns.map(column => (
                    <div key={`${column.id}header`} className={classes.tableHeader}>
                        {column.label}
                    </div>
                ))}
                {data.map((item, index) => columns.map(column => {
                    const values = item.attributes;
                    let value = null;

                    switch (column.id) {
                    case 'title':
                        value = values.name;
                        break;
                    case 'type':
                        value = (
                            <Chip
                                size="small"
                                className={classes.chip}
                                label={values.type}
                            />
                        );
                        break;
                    case 'polar-angle':
                        value = values.polarAngle;
                        break;
                    case 'max-rabi-rate':
                        value = values.maximumRabiRate;
                        break;
                    case 'button':
                        value = <ChevronRight className={classes.chevronRight} />;
                        break;
                    default:
                    }

                    const classNames = [
                        classes.tableCell,
                        ['title', 'button'].includes(column.id) ? '' : classes.desktopOnlyCell,
                        index === 0 ? classes.firstRow : ''
                    ].join(' ').replace('  ', ' ').trim();

                    return (
                        <div
                            key={column.id}
                            className={classNames}
                            style={column.style ? column.style : {}}
                        >
                            {typeof column.format === 'function'// && typeof value === 'number'
                                ? column.format(value)
                                : value}
                        </div>
                    );
                }))}
            </div>
        </div>
    );
};

Controls.displayName = 'Controls';

export default memo<ControlsProps>(Controls);
