import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";

import { Button } from "../ui/button";

const AppModal = ({
  buttonTitle,
  buttonClassName,
  title,
  desciption,
  children,
  outsideDismissible = true,
  onOpen
}) => {
  return (
    <Dialog className="max-h-fit">
      <DialogTrigger asChild>
        <Button onClick={onOpen} className={buttonClassName}>
          {buttonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[calc(100dvh-48px)] max-w-[calc(100dvw-48px)] sm:max-w-lg overflow-y-scroll"
        onInteractOutside={
          outsideDismissible === true
            ? null
            : (e) => {
                e.preventDefault();
              }
        }
      >
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {desciption && <DialogDescription>{desciption}</DialogDescription>}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
