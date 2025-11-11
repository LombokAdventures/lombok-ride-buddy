import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Trash2, GripVertical, Plus } from "lucide-react";

interface HeroImage {
  id: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  display_order: number;
  is_active: boolean;
}

export const AdminHeroImages = () => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [newImage, setNewImage] = useState({
    image_url: "",
    title: "",
    subtitle: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    const { data, error } = await supabase
      .from("hero_images")
      .select("*")
      .order("display_order");

    if (!error && data) {
      setImages(data);
    }
  };

  const addHeroImage = async () => {
    if (!newImage.image_url) {
      toast({
        title: "Error",
        description: "Image URL is required",
        variant: "destructive",
      });
      return;
    }

    const maxOrder = Math.max(...images.map((img) => img.display_order), 0);
    
    const { error } = await supabase.from("hero_images").insert({
      image_url: newImage.image_url,
      title: newImage.title || null,
      subtitle: newImage.subtitle || null,
      display_order: maxOrder + 1,
      is_active: true,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add image",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Hero image added",
      });
      setNewImage({ image_url: "", title: "", subtitle: "" });
      setIsAdding(false);
      fetchHeroImages();
    }
  };

  const updateImage = async (id: string, updates: Partial<HeroImage>) => {
    const { error } = await supabase
      .from("hero_images")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update image",
        variant: "destructive",
      });
    } else {
      fetchHeroImages();
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hero image?")) return;

    const { error } = await supabase
      .from("hero_images")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Hero image deleted",
      });
      fetchHeroImages();
    }
  };

  const moveImage = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === images.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const newImages = [...images];
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];

    // Update display orders
    const updates = newImages.map((img, idx) => ({
      id: img.id,
      display_order: idx,
    }));

    for (const update of updates) {
      await supabase
        .from("hero_images")
        .update({ display_order: update.display_order })
        .eq("id", update.id);
    }

    fetchHeroImages();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Hero Slider Images</CardTitle>
          <Button onClick={() => setIsAdding(!isAdding)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAdding && (
          <Card className="p-4 bg-muted/50">
            <div className="space-y-4">
              <div>
                <Label>Image URL *</Label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={newImage.image_url}
                  onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  placeholder="Hero title"
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  placeholder="Hero subtitle"
                  value={newImage.subtitle}
                  onChange={(e) => setNewImage({ ...newImage, subtitle: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addHeroImage}>Add Image</Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          {images.map((image, index) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="flex gap-4 p-4">
                <div className="flex flex-col justify-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveImage(index, "up")}
                    disabled={index === 0}
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground text-center">
                    {index + 1}
                  </span>
                </div>

                <img
                  src={image.image_url}
                  alt={image.title || "Hero image"}
                  className="w-32 h-20 object-cover rounded"
                />

                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Title"
                    value={image.title || ""}
                    onChange={(e) => updateImage(image.id, { title: e.target.value })}
                  />
                  <Input
                    placeholder="Subtitle"
                    value={image.subtitle || ""}
                    onChange={(e) => updateImage(image.id, { subtitle: e.target.value })}
                  />
                </div>

                <div className="flex flex-col justify-between items-end">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Active</Label>
                    <Switch
                      checked={image.is_active}
                      onCheckedChange={(checked) => updateImage(image.id, { is_active: checked })}
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteImage(image.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {images.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No hero images yet. Add your first image above.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
