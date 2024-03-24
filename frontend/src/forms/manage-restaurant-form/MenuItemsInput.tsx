import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    index: number;
    removeMenuItem: () => void;
};

const MenuItemsInput = ({ index, removeMenuItem }: Props ) => {
    const {control} = useFormContext();

    return (
        <div className="flex flex-row items-end gap-2">
            <FormField
                control={control}
                name={`menuItems.${index}.name`}
                render={({field}) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">Name <FormMessage />
                      </FormLabel>
                        <FormControl >
                            <Input {...field}
                                   placeholder="Chicken Biryani"
                                   className= "bg-white"
                            />
                        </FormControl>
                    </FormItem>
                )}
                />

            <FormField
                control={control}
                name={`menuItems.${index}.price`}
                render={({field}) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-1">
                            Price (Ksh) <FormMessage />
                        </FormLabel>
                        <FormControl >
                            <Input {...field}
                                   placeholder="250"
                                   className= "bg-white"
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <Button type="button" onClick={removeMenuItem} className="bg-red-500 max-h-fit">
                Remove
            </Button>
        </div>
    );
};

export default MenuItemsInput;




























