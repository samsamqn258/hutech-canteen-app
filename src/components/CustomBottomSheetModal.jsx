import React, { forwardRef, useMemo } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

// eslint-disable-next-line react/display-name
const CustomBottomSheetModal = forwardRef(
    ({ children, renderBackdrop, indexSnapPoint = -1 }, ref) => {
        const snapPoints = useMemo(() => ['50%', '70%', '80%', '90%'], []);

        return (
            <BottomSheetModal
                ref={ref}
                index={indexSnapPoint}
                backdropComponent={renderBackdrop}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                // handleIndicatorStyle={{ backgroundColor: '#fff' }}
            >
                {children}
            </BottomSheetModal>
        );
    },
);

export default CustomBottomSheetModal;
