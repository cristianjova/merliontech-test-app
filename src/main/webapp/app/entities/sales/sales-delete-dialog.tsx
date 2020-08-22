import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';

import { ISales } from 'app/shared/model/sales.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './sales.reducer';

export interface ISalesDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalesDeleteDialog = (props: ISalesDeleteDialogProps) => {
  const [open, setOpen] = useState(true);

  const handleCloseDialog = () => {
    setOpen(false);
    props.history.push('/sales');
  };

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleCloseDialog();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.salesEntity.id);
  };

  const { salesEntity } = props;
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <Translate contentKey="entity.delete.title">
              Confirm delete operation
            </Translate>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="testApp.sales.delete.question">
            <Typography>
              <Translate
                contentKey="testApp.sales.delete.question"
                interpolate={{ id: salesEntity.id }}
              >
                Are you sure you want to delete this Sales?
              </Translate>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button onClick={confirmDelete} color="primary" id="jhi-confirm-delete-sales">
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
  updateSuccess: sales.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDeleteDialog);
