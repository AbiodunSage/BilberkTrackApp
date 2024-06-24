import { useToast } from "@/components/ui/use-toast";

const useShowToast = () => {
  const { toast } = useToast();
  const showToast = (variant, title, description) => {
    toast({
      variant: variant,
      title: title,
      description: description,
      /* action: <ToastAction altText="Try again">Try again</ToastAction>,
       */
    });
  };

  return showToast;
};
export default useShowToast;
