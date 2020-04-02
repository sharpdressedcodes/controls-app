import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    title: {
        paddingBottom: 0
    },
    titleText: {
        color: theme.palette.grey[500],
        fontSize: '15px',
        fontWeight: theme.typography.fontWeightRegular,
        letterSpacing: '0.25em',
        marginTop: theme.spacing(2),
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    paper: {
        minHeight: 'initial',
        maxHeight: '404px',
        minWidth: 'initial',
        maxWidth: '500px',
        width: '100%',
        height: '100%'
    },
    content: {
        paddingTop: '5px !important'
    },
    contentText: {
        color: theme.palette.secondary.main,
        fontSize: '32px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        lineHeight: '38px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        maxWidth: '350px',
        margin: '0 auto 50px',
        height: '100%'
    },
    tryAgainButton: {
        width: '100%',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
    },
    tryAgainButtonText: {
        fontWeight: 'normal',
        fontSize: '12px'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        padding: 0
    }
}));

const ErrorDialog = props => {
    const { error, onErrorClose, onTryAgain } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={Boolean(error)}
            onClose={onErrorClose}
            aria-labelledby="error-modal__title"
            aria-describedby="error-modal__description"
            maxWidth={false}
            classes={{ root: classes.root, paper: classes.paper }}
        >
            <DialogTitle className={classes.title}>
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onErrorClose}
                >
                    <CloseIcon />
                </IconButton>
                <Box id="error-modal__title" className={classes.titleText}>
                    Error
                </Box>
            </DialogTitle>
            <div className={classes.container}>
                <DialogContent className={classes.content}>
                    <DialogContentText
                        id="error-modal__description"
                        className={classes.contentText}
                    >
                        Unable to load controls
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onTryAgain}
                        className={classes.tryAgainButton}
                        classes={{ label: classes.tryAgainButtonText }}
                    >
                        Try again
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

ErrorDialog.displayName = 'ErrorDialog';

ErrorDialog.propTypes = {
    onTryAgain: PropTypes.func.isRequired,
    onErrorClose: PropTypes.func.isRequired,
    error: PropTypes.string
};

ErrorDialog.defaultProps = {
    error: null
};

export default memo(ErrorDialog);
