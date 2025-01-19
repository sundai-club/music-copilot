'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  spotifyLink: z.string().url("Please enter a valid Spotify profile URL"),
  instagramHandle: z.string().min(1, "Instagram handle is required"),
  primaryGenre: z.string().min(1, "Primary genre is required"),
  subGenres: z.string().optional(),
  artistBio: z.string().min(50, "Please provide at least 50 characters").max(500, "Bio should not exceed 500 characters"),
  influences: z.string().optional(),
  targetAudience: z.string().min(1, "Target audience description is required"),
  visualStyle: z.string().min(1, "Visual style preference is required"),
  brandValues: z.string().min(1, "Brand values are required"),
  existingColors: z.string().optional(),
})

export function ArtistSetupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spotifyLink: "",
      instagramHandle: "",
      primaryGenre: "",
      subGenres: "",
      artistBio: "",
      influences: "",
      targetAudience: "",
      visualStyle: "",
      brandValues: "",
      existingColors: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="spotifyLink"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Spotify Profile URL</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="https://open.spotify.com/artist/..." {...field} />
                </FormControl>
                <FormDescription className="mt-1">
                  Your Spotify artist profile URL
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagramHandle"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Instagram Handle</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="@yourusername" {...field} />
                </FormControl>
                <FormDescription className="mt-1">
                  Your Instagram username without the @ symbol
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="primaryGenre"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Primary Genre</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your main genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="hiphop">Hip Hop</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="rb">R&B</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                    <SelectItem value="classical">Classical</SelectItem>
                    <SelectItem value="folk">Folk</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subGenres"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Sub-Genres (Optional)</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="e.g., indie rock, synthpop, trap" {...field} />
                </FormControl>
                <FormDescription className="mt-1">
                  List any sub-genres that describe your music
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="artistBio"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Artist Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    className="min-h-[100px] w-full"
                    placeholder="Tell us about your musical journey, style, and what makes you unique..."
                    {...field}
                  />
                </FormControl>
                <FormDescription className="mt-1">
                  50-500 characters about your artistic identity
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="influences"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Musical Influences (Optional)</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="Artists who have influenced your sound" {...field} />
                </FormControl>
                <FormDescription className="mt-1">
                  List artists who have shaped your musical style
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Target Audience</FormLabel>
                <FormControl>
                  <Textarea 
                    className="min-h-[100px] w-full"
                    placeholder="Describe your ideal listeners, their age range, interests..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visualStyle"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Visual Style Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your preferred visual style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="bold">Bold & Vibrant</SelectItem>
                    <SelectItem value="retro">Retro/Vintage</SelectItem>
                    <SelectItem value="modern">Modern & Clean</SelectItem>
                    <SelectItem value="artistic">Artistic & Abstract</SelectItem>
                    <SelectItem value="dark">Dark & Moody</SelectItem>
                    <SelectItem value="natural">Natural & Organic</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandValues"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Brand Values</FormLabel>
                <FormControl>
                  <Textarea 
                    className="min-h-[100px] w-full"
                    placeholder="What values and messages do you want your brand to convey?"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="mt-1">
                  Describe the core values and messages of your artistic brand
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="existingColors"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Existing Brand Colors (Optional)</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="e.g., #FF5733, #33FF57" {...field} />
                </FormControl>
                <FormDescription className="mt-1">
                  Enter hex codes of your existing brand colors, if any
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-8">Submit</Button>
      </form>
    </Form>
  )
} 