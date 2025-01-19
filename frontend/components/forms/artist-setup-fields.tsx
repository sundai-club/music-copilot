'use client'

import { motion } from "framer-motion"
import { UseFormReturn } from "react-hook-form"
import { HexColorPicker } from "react-colorful"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { type ArtistSetupFormData, getDescription, getPlaceholder } from "@/lib/validations/artist-setup"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface ArtistSetupFieldsProps {
  step: number
  form: UseFormReturn<ArtistSetupFormData>
}

const slideAnimation = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
  transition: { 
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1]
  }
}

export function ArtistSetupFields({ step, form }: ArtistSetupFieldsProps) {
  const renderGenreFields = () => (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="primaryGenre"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Primary Genre</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-14 text-lg transition-all duration-200 hover:border-primary">
                  <SelectValue placeholder="Select your main genre" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem key="pop" value="pop">Pop</SelectItem>
                <SelectItem key="rock" value="rock">Rock</SelectItem>
                <SelectItem key="hiphop" value="hiphop">Hip Hop</SelectItem>
                <SelectItem key="electronic" value="electronic">Electronic</SelectItem>
                <SelectItem key="rb" value="rb">R&B</SelectItem>
                <SelectItem key="jazz" value="jazz">Jazz</SelectItem>
                <SelectItem key="classical" value="classical">Classical</SelectItem>
                <SelectItem key="folk" value="folk">Folk</SelectItem>
                <SelectItem key="metal" value="metal">Metal</SelectItem>
                <SelectItem key="other" value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="mt-2 text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="secondaryGenre"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Secondary Genre</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-14 text-lg transition-all duration-200 hover:border-primary">
                  <SelectValue placeholder="Select your secondary genre" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem key="pop" value="pop">Pop</SelectItem>
                <SelectItem key="rock" value="rock">Rock</SelectItem>
                <SelectItem key="hiphop" value="hiphop">Hip Hop</SelectItem>
                <SelectItem key="electronic" value="electronic">Electronic</SelectItem>
                <SelectItem key="rb" value="rb">R&B</SelectItem>
                <SelectItem key="jazz" value="jazz">Jazz</SelectItem>
                <SelectItem key="classical" value="classical">Classical</SelectItem>
                <SelectItem key="folk" value="folk">Folk</SelectItem>
                <SelectItem key="metal" value="metal">Metal</SelectItem>
                <SelectItem key="other" value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="mt-2 text-sm" />
          </FormItem>
        )}
      />
    </div>
  )

  const renderBrandColorFields = () => (
    <FormField
      control={form.control}
      name="brandColors"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormDescription className="mb-4">
            {getDescription("brandColors")}
          </FormDescription>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormLabel className="text-base">Primary Color</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-14 flex items-center justify-center gap-2 hover:border-primary"
                  >
                    {field.value[0] ? (
                      <>
                        <div 
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: field.value[0] }}
                        />
                        {field.value[0]}
                      </>
                    ) : (
                      "Choose Color"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker
                    color={field.value[0] || "#000000"}
                    onChange={(color) => {
                      const newColors = [...field.value]
                      newColors[0] = color
                      field.onChange(newColors)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <FormLabel className="text-base">Secondary Color</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-14 flex items-center justify-center gap-2 hover:border-primary"
                  >
                    {field.value[1] ? (
                      <>
                        <div 
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: field.value[1] }}
                        />
                        {field.value[1]}
                      </>
                    ) : (
                      "Choose Color"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker
                    color={field.value[1] || "#000000"}
                    onChange={(color) => {
                      const newColors = [...field.value]
                      newColors[1] = color
                      field.onChange(newColors)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <FormMessage className="mt-2 text-sm" />
        </FormItem>
      )}
    />
  )

  const renderVisualStyleField = () => (
    <FormField
      control={form.control}
      name="visualStyle"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="h-14 text-lg transition-all duration-200 hover:border-primary">
                <SelectValue placeholder="Select your preferred visual style" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem key="minimalist" value="minimalist">Minimalist</SelectItem>
              <SelectItem key="bold" value="bold">Bold & Vibrant</SelectItem>
              <SelectItem key="retro" value="retro">Retro/Vintage</SelectItem>
              <SelectItem key="modern" value="modern">Modern & Clean</SelectItem>
              <SelectItem key="artistic" value="artistic">Artistic & Abstract</SelectItem>
              <SelectItem key="dark" value="dark">Dark & Moody</SelectItem>
              <SelectItem key="natural" value="natural">Natural & Organic</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage className="mt-2 text-sm" />
        </FormItem>
      )}
    />
  )

  const renderTextareaField = (name: "artistBio" | "storyMaterials") => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormControl>
            <Textarea 
              className="min-h-[200px] text-lg p-4 resize-none transition-all duration-200 hover:border-primary focus-visible:ring-2"
              placeholder={name === "artistBio" 
                ? "Tell us about your musical journey, style, and what makes you unique..."
                : "Share your lyrics or any storytelling materials that help convey your artistic vision..."
              }
              {...field}
            />
          </FormControl>
          <FormDescription className="mt-2 text-sm">
            {name === "artistBio" ? "50-500 characters about your artistic identity" : "This will help us better understand your artistic direction"}
          </FormDescription>
          <FormMessage className="mt-1 text-sm" />
        </FormItem>
      )}
    />
  )

  const renderInputField = (name: "songSpotifyUrl" | "instagramHandle") => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormControl>
            <Input 
              className="h-14 text-lg px-4 transition-all duration-200 hover:border-primary focus-visible:ring-2" 
              placeholder={getPlaceholder(name)}
              {...field} 
            />
          </FormControl>
          <FormDescription className="mt-2 text-sm">
            {getDescription(name)}
          </FormDescription>
          <FormMessage className="mt-2 text-sm" />
        </FormItem>
      )}
    />
  )

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return renderInputField("songSpotifyUrl")
      case 1:
        return renderInputField("instagramHandle")
      case 2:
        return renderGenreFields()
      case 3:
        return renderTextareaField("artistBio")
      case 4:
        return renderTextareaField("storyMaterials")
      case 5:
        return renderVisualStyleField()
      case 6:
        return renderBrandColorFields()
      default:
        return null
    }
  }

  return (
    <motion.div
      key={step}
      {...slideAnimation}
      className="w-full"
    >
      {renderStepContent()}
    </motion.div>
  )
} 