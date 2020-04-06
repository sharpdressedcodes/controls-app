import React, { memo } from 'react';
import {
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {},
    title: {},
    content: {
        overflow: 'hidden',
        textAlign: 'center'
    }
}));

const defaultProps = {
    loading: false
};

type LoadingDialogProps = {
    loading: boolean
} & typeof defaultProps;

const LoadingDialog = (props: LoadingDialogProps) => {
    const { loading } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={loading}
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby="loading-dialog__title"
            className={classes.root}
        >
            <DialogTitle id="loading-dialog__title" className={classes.title}>
                Loading...
            </DialogTitle>
            <DialogContent className={classes.content}>
                <CircularProgress />
            </DialogContent>
        </Dialog>
    );
};

LoadingDialog.displayName = 'LoadingDialog';

LoadingDialog.defaultProps = defaultProps;

export default memo<LoadingDialogProps>(LoadingDialog);
