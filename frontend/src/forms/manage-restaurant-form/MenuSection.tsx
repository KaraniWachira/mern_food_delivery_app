import {useFieldArray, useFormContext} from "react-hook-form";
import {FormDescription, FormField, FormItem} from "@/components/ui/form.tsx";
import { Button } from "@/components/ui/button";
import MenuItemsInput from "@/forms/manage-restaurant-form/MenuItemsInput.tsx";

const MenuSection = () => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "menuItems",
    });


  return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold"> Menu </h2>
                <FormDescription>
                    Create your menu with items name and prices
                </FormDescription>
            </div>
            <FormField control={control} name="menuItems" render={() => (
                <FormItem className="flex flex-col gap-2">
                    {fields.map((_, index) => (
                        <MenuItemsInput
                            index={index}
                                removeMenuItem={()=> remove (index)}
                                />
                    ))}
                </FormItem>
            )}
            />
            <Button type="button" onClick={() => append({name: "", price: "" })}>
                Add Menu Item
            </Button>

        </div>
  )
};


export default MenuSection;












