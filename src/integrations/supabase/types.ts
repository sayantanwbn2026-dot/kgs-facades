export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      about_certifications: {
        Row: {
          created_at: string | null
          id: string
          label: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          label?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      about_leadership: {
        Row: {
          bio: string | null
          created_at: string | null
          id: string
          image_url: string | null
          name: string | null
          role: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          role?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          role?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      about_page: {
        Row: {
          certifications_eyebrow: string | null
          certifications_heading: string | null
          certifications_intro: string | null
          created_at: string | null
          crumb: string | null
          cta_copy: string | null
          cta_title: string | null
          factory_image_url: string | null
          factory_label: string | null
          factory_name: string | null
          hero_eyebrow: string | null
          hero_highlight: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          leadership_eyebrow: string | null
          leadership_heading: string | null
          leadership_intro: string | null
          paragraph1: string | null
          paragraph2: string | null
          paragraph3: string | null
          philosophy_eyebrow: string | null
          philosophy_heading: string | null
          philosophy_image_url: string | null
          stat1_label: string | null
          stat1_suffix: string | null
          stat1_value: number | null
          stat2_label: string | null
          stat2_suffix: string | null
          stat2_value: number | null
          stat3_label: string | null
          stat3_suffix: string | null
          stat3_value: number | null
          stat4_label: string | null
          stat4_suffix: string | null
          stat4_value: number | null
          timeline_eyebrow: string | null
          timeline_heading: string | null
          updated_at: string | null
        }
        Insert: {
          certifications_eyebrow?: string | null
          certifications_heading?: string | null
          certifications_intro?: string | null
          created_at?: string | null
          crumb?: string | null
          cta_copy?: string | null
          cta_title?: string | null
          factory_image_url?: string | null
          factory_label?: string | null
          factory_name?: string | null
          hero_eyebrow?: string | null
          hero_highlight?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          leadership_eyebrow?: string | null
          leadership_heading?: string | null
          leadership_intro?: string | null
          paragraph1?: string | null
          paragraph2?: string | null
          paragraph3?: string | null
          philosophy_eyebrow?: string | null
          philosophy_heading?: string | null
          philosophy_image_url?: string | null
          stat1_label?: string | null
          stat1_suffix?: string | null
          stat1_value?: number | null
          stat2_label?: string | null
          stat2_suffix?: string | null
          stat2_value?: number | null
          stat3_label?: string | null
          stat3_suffix?: string | null
          stat3_value?: number | null
          stat4_label?: string | null
          stat4_suffix?: string | null
          stat4_value?: number | null
          timeline_eyebrow?: string | null
          timeline_heading?: string | null
          updated_at?: string | null
        }
        Update: {
          certifications_eyebrow?: string | null
          certifications_heading?: string | null
          certifications_intro?: string | null
          created_at?: string | null
          crumb?: string | null
          cta_copy?: string | null
          cta_title?: string | null
          factory_image_url?: string | null
          factory_label?: string | null
          factory_name?: string | null
          hero_eyebrow?: string | null
          hero_highlight?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          leadership_eyebrow?: string | null
          leadership_heading?: string | null
          leadership_intro?: string | null
          paragraph1?: string | null
          paragraph2?: string | null
          paragraph3?: string | null
          philosophy_eyebrow?: string | null
          philosophy_heading?: string | null
          philosophy_image_url?: string | null
          stat1_label?: string | null
          stat1_suffix?: string | null
          stat1_value?: number | null
          stat2_label?: string | null
          stat2_suffix?: string | null
          stat2_value?: number | null
          stat3_label?: string | null
          stat3_suffix?: string | null
          stat3_value?: number | null
          stat4_label?: string | null
          stat4_suffix?: string | null
          stat4_value?: number | null
          timeline_eyebrow?: string | null
          timeline_heading?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      about_timeline: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          sort_order: number | null
          title: string | null
          updated_at: string | null
          year: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
          year?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
          year?: string | null
        }
        Relationships: []
      }
      client_projects: {
        Row: {
          area: string | null
          awards: string | null
          client_id: string
          completion_date: string | null
          created_at: string
          description: string | null
          duration: string | null
          fee: string | null
          gallery_urls: string | null
          hero_image_url: string | null
          id: string
          image_url: string | null
          kgs_role: string | null
          location: string | null
          name: string
          scope: string | null
          slug: string | null
          sort_order: number
          sqft_value: string | null
          status: string | null
          system_description: string | null
          testimonial_author: string | null
          testimonial_quote: string | null
          testimonial_role: string | null
          updated_at: string
          valuation: string | null
          year: string | null
        }
        Insert: {
          area?: string | null
          awards?: string | null
          client_id: string
          completion_date?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          fee?: string | null
          gallery_urls?: string | null
          hero_image_url?: string | null
          id?: string
          image_url?: string | null
          kgs_role?: string | null
          location?: string | null
          name: string
          scope?: string | null
          slug?: string | null
          sort_order?: number
          sqft_value?: string | null
          status?: string | null
          system_description?: string | null
          testimonial_author?: string | null
          testimonial_quote?: string | null
          testimonial_role?: string | null
          updated_at?: string
          valuation?: string | null
          year?: string | null
        }
        Update: {
          area?: string | null
          awards?: string | null
          client_id?: string
          completion_date?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          fee?: string | null
          gallery_urls?: string | null
          hero_image_url?: string | null
          id?: string
          image_url?: string | null
          kgs_role?: string | null
          location?: string | null
          name?: string
          scope?: string | null
          slug?: string | null
          sort_order?: number
          sqft_value?: string | null
          status?: string | null
          system_description?: string | null
          testimonial_author?: string | null
          testimonial_quote?: string | null
          testimonial_role?: string | null
          updated_at?: string
          valuation?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          about_long: string | null
          city: string | null
          created_at: string
          description: string | null
          established_year: string | null
          featured: boolean
          hero_image_url: string | null
          id: string
          logo_url: string | null
          name: string
          partnership_since: string | null
          sector: string | null
          slug: string | null
          sort_order: number
          tagline: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          about_long?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          established_year?: string | null
          featured?: boolean
          hero_image_url?: string | null
          id?: string
          logo_url?: string | null
          name: string
          partnership_since?: string | null
          sector?: string | null
          slug?: string | null
          sort_order?: number
          tagline?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          about_long?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          established_year?: string | null
          featured?: boolean
          hero_image_url?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          partnership_since?: string | null
          sector?: string | null
          slug?: string | null
          sort_order?: number
          tagline?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      clients_page: {
        Row: {
          created_at: string
          crumb: string | null
          cta_copy: string | null
          cta_title: string | null
          hero_eyebrow: string | null
          hero_highlight: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          singleton: boolean
          stat1_label: string | null
          stat1_value: string | null
          stat2_label: string | null
          stat2_value: string | null
          stat3_label: string | null
          stat3_value: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          crumb?: string | null
          cta_copy?: string | null
          cta_title?: string | null
          hero_eyebrow?: string | null
          hero_highlight?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          singleton?: boolean
          stat1_label?: string | null
          stat1_value?: string | null
          stat2_label?: string | null
          stat2_value?: string | null
          stat3_label?: string | null
          stat3_value?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          crumb?: string | null
          cta_copy?: string | null
          cta_title?: string | null
          hero_eyebrow?: string | null
          hero_highlight?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          singleton?: boolean
          stat1_label?: string | null
          stat1_value?: string | null
          stat2_label?: string | null
          stat2_value?: string | null
          stat3_label?: string | null
          stat3_value?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contact: {
        Row: {
          description: string
          email: string
          eyebrow: string
          factory_address: string
          heading: string
          id: string
          office_address: string
          phone: string
          singleton: boolean
          updated_at: string | null
        }
        Insert: {
          description?: string
          email?: string
          eyebrow?: string
          factory_address?: string
          heading?: string
          id?: string
          office_address?: string
          phone?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Update: {
          description?: string
          email?: string
          eyebrow?: string
          factory_address?: string
          heading?: string
          id?: string
          office_address?: string
          phone?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          budget: string
          created_at: string
          id: string
          location: string
          message: string
          name: string
          org: string
          project: string
          read_at: string | null
        }
        Insert: {
          budget?: string
          created_at?: string
          id?: string
          location?: string
          message?: string
          name?: string
          org?: string
          project?: string
          read_at?: string | null
        }
        Update: {
          budget?: string
          created_at?: string
          id?: string
          location?: string
          message?: string
          name?: string
          org?: string
          project?: string
          read_at?: string | null
        }
        Relationships: []
      }
      expertise_compare: {
        Row: {
          capability: string | null
          created_at: string | null
          glass: string | null
          id: string
          sort_order: number | null
          tolerance: string | null
          updated_at: string | null
          use_case: string | null
        }
        Insert: {
          capability?: string | null
          created_at?: string | null
          glass?: string | null
          id?: string
          sort_order?: number | null
          tolerance?: string | null
          updated_at?: string | null
          use_case?: string | null
        }
        Update: {
          capability?: string | null
          created_at?: string | null
          glass?: string | null
          id?: string
          sort_order?: number | null
          tolerance?: string | null
          updated_at?: string | null
          use_case?: string | null
        }
        Relationships: []
      }
      expertise_intro: {
        Row: {
          description: string
          eyebrow: string
          heading: string
          id: string
          singleton: boolean
          updated_at: string | null
        }
        Insert: {
          description?: string
          eyebrow?: string
          heading?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Update: {
          description?: string
          eyebrow?: string
          heading?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      expertise_items: {
        Row: {
          body: string | null
          description: string
          id: string
          image_url: string
          number_label: string
          short_description: string | null
          sort_order: number
          spec1_key: string | null
          spec1_value: string | null
          spec2_key: string | null
          spec2_value: string | null
          spec3_key: string | null
          spec3_value: string | null
          spec4_key: string | null
          spec4_value: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          body?: string | null
          description: string
          id?: string
          image_url?: string
          number_label: string
          short_description?: string | null
          sort_order?: number
          spec1_key?: string | null
          spec1_value?: string | null
          spec2_key?: string | null
          spec2_value?: string | null
          spec3_key?: string | null
          spec3_value?: string | null
          spec4_key?: string | null
          spec4_value?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          body?: string | null
          description?: string
          id?: string
          image_url?: string
          number_label?: string
          short_description?: string | null
          sort_order?: number
          spec1_key?: string | null
          spec1_value?: string | null
          spec2_key?: string | null
          spec2_value?: string | null
          spec3_key?: string | null
          spec3_value?: string | null
          spec4_key?: string | null
          spec4_value?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      expertise_page: {
        Row: {
          created_at: string | null
          crumb: string | null
          cta_copy: string | null
          cta_title: string | null
          hero_eyebrow: string | null
          hero_highlight: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          matrix_eyebrow: string | null
          matrix_heading: string | null
          tabs_eyebrow: string | null
          tabs_heading: string | null
          tabs_heading_accent: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          crumb?: string | null
          cta_copy?: string | null
          cta_title?: string | null
          hero_eyebrow?: string | null
          hero_highlight?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          matrix_eyebrow?: string | null
          matrix_heading?: string | null
          tabs_eyebrow?: string | null
          tabs_heading?: string | null
          tabs_heading_accent?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          crumb?: string | null
          cta_copy?: string | null
          cta_title?: string | null
          hero_eyebrow?: string | null
          hero_highlight?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          matrix_eyebrow?: string | null
          matrix_heading?: string | null
          tabs_eyebrow?: string | null
          tabs_heading?: string | null
          tabs_heading_accent?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      features: {
        Row: {
          description: string
          id: string
          sort_order: number
          tag: string
          title: string
          updated_at: string | null
          visual_kind: string
        }
        Insert: {
          description: string
          id?: string
          sort_order?: number
          tag: string
          title: string
          updated_at?: string | null
          visual_kind?: string
        }
        Update: {
          description?: string
          id?: string
          sort_order?: number
          tag?: string
          title?: string
          updated_at?: string | null
          visual_kind?: string
        }
        Relationships: []
      }
      features_intro: {
        Row: {
          description: string
          eyebrow: string
          heading: string
          id: string
          singleton: boolean
          updated_at: string | null
        }
        Insert: {
          description?: string
          eyebrow?: string
          heading?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Update: {
          description?: string
          eyebrow?: string
          heading?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      footer: {
        Row: {
          brand_line1: string
          brand_line2_accent: string
          brand_line2_rest: string
          contact_email: string
          contact_phone: string
          copyright_holder: string
          factory_address1: string
          factory_address2: string
          hours_days: string
          hours_time: string
          id: string
          singleton: boolean
          studio_address1: string
          studio_address2: string
          tagline: string
          updated_at: string | null
        }
        Insert: {
          brand_line1?: string
          brand_line2_accent?: string
          brand_line2_rest?: string
          contact_email?: string
          contact_phone?: string
          copyright_holder?: string
          factory_address1?: string
          factory_address2?: string
          hours_days?: string
          hours_time?: string
          id?: string
          singleton?: boolean
          studio_address1?: string
          studio_address2?: string
          tagline?: string
          updated_at?: string | null
        }
        Update: {
          brand_line1?: string
          brand_line2_accent?: string
          brand_line2_rest?: string
          contact_email?: string
          contact_phone?: string
          copyright_holder?: string
          factory_address1?: string
          factory_address2?: string
          hours_days?: string
          hours_time?: string
          id?: string
          singleton?: boolean
          studio_address1?: string
          studio_address2?: string
          tagline?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      hero: {
        Row: {
          background_image_url: string
          created_at: string | null
          cta_primary_label: string
          cta_primary_link: string
          cta_secondary_label: string
          cta_secondary_link: string
          headline_line1: string
          headline_line2: string
          id: string
          logo_url: string
          partners_label: string
          singleton: boolean
          stat1_label: string
          stat1_suffix: string
          stat1_value: number
          stat2_label: string
          stat2_suffix: string
          stat2_value: number
          stat3_label: string
          stat3_suffix: string
          stat3_value: number
          subtitle: string
          trust_text: string
          updated_at: string | null
        }
        Insert: {
          background_image_url?: string
          created_at?: string | null
          cta_primary_label?: string
          cta_primary_link?: string
          cta_secondary_label?: string
          cta_secondary_link?: string
          headline_line1?: string
          headline_line2?: string
          id?: string
          logo_url?: string
          partners_label?: string
          singleton?: boolean
          stat1_label?: string
          stat1_suffix?: string
          stat1_value?: number
          stat2_label?: string
          stat2_suffix?: string
          stat2_value?: number
          stat3_label?: string
          stat3_suffix?: string
          stat3_value?: number
          subtitle?: string
          trust_text?: string
          updated_at?: string | null
        }
        Update: {
          background_image_url?: string
          created_at?: string | null
          cta_primary_label?: string
          cta_primary_link?: string
          cta_secondary_label?: string
          cta_secondary_link?: string
          headline_line1?: string
          headline_line2?: string
          id?: string
          logo_url?: string
          partners_label?: string
          singleton?: boolean
          stat1_label?: string
          stat1_suffix?: string
          stat1_value?: number
          stat2_label?: string
          stat2_suffix?: string
          stat2_value?: number
          stat3_label?: string
          stat3_suffix?: string
          stat3_value?: number
          subtitle?: string
          trust_text?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      manufacturing: {
        Row: {
          capability1: string
          capability2: string
          capability3: string
          capability4: string
          description: string
          eyebrow: string
          heading: string
          id: string
          image_url: string
          singleton: boolean
          stat1_decimals: number
          stat1_label: string
          stat1_suffix: string
          stat1_value: number
          stat2_decimals: number
          stat2_label: string
          stat2_suffix: string
          stat2_value: number
          stat3_decimals: number
          stat3_label: string
          stat3_suffix: string
          stat3_value: number
          stat4_decimals: number
          stat4_label: string
          stat4_suffix: string
          stat4_value: number
          updated_at: string | null
        }
        Insert: {
          capability1?: string
          capability2?: string
          capability3?: string
          capability4?: string
          description?: string
          eyebrow?: string
          heading?: string
          id?: string
          image_url?: string
          singleton?: boolean
          stat1_decimals?: number
          stat1_label?: string
          stat1_suffix?: string
          stat1_value?: number
          stat2_decimals?: number
          stat2_label?: string
          stat2_suffix?: string
          stat2_value?: number
          stat3_decimals?: number
          stat3_label?: string
          stat3_suffix?: string
          stat3_value?: number
          stat4_decimals?: number
          stat4_label?: string
          stat4_suffix?: string
          stat4_value?: number
          updated_at?: string | null
        }
        Update: {
          capability1?: string
          capability2?: string
          capability3?: string
          capability4?: string
          description?: string
          eyebrow?: string
          heading?: string
          id?: string
          image_url?: string
          singleton?: boolean
          stat1_decimals?: number
          stat1_label?: string
          stat1_suffix?: string
          stat1_value?: number
          stat2_decimals?: number
          stat2_label?: string
          stat2_suffix?: string
          stat2_value?: number
          stat3_decimals?: number
          stat3_label?: string
          stat3_suffix?: string
          stat3_value?: number
          stat4_decimals?: number
          stat4_label?: string
          stat4_suffix?: string
          stat4_value?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      material_partners: {
        Row: {
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          id?: string
          name: string
          sort_order?: number
        }
        Update: {
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      materials_intro: {
        Row: {
          description: string
          eyebrow: string
          heading: string
          id: string
          singleton: boolean
          updated_at: string | null
        }
        Insert: {
          description?: string
          eyebrow?: string
          heading?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Update: {
          description?: string
          eyebrow?: string
          heading?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          sort_order: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          sort_order?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      process_intro: {
        Row: {
          eyebrow: string
          heading_accent: string
          heading_main: string
          id: string
          singleton: boolean
          updated_at: string | null
        }
        Insert: {
          eyebrow?: string
          heading_accent?: string
          heading_main?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Update: {
          eyebrow?: string
          heading_accent?: string
          heading_main?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      process_page: {
        Row: {
          created_at: string | null
          crumb: string | null
          cta_copy: string | null
          cta_title: string | null
          deliverables_eyebrow: string | null
          deliverables_heading: string | null
          hero_eyebrow: string | null
          hero_highlight: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          timeline_eyebrow: string | null
          timeline_heading: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          crumb?: string | null
          cta_copy?: string | null
          cta_title?: string | null
          deliverables_eyebrow?: string | null
          deliverables_heading?: string | null
          hero_eyebrow?: string | null
          hero_highlight?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          timeline_eyebrow?: string | null
          timeline_heading?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          crumb?: string | null
          cta_copy?: string | null
          cta_title?: string | null
          deliverables_eyebrow?: string | null
          deliverables_heading?: string | null
          hero_eyebrow?: string | null
          hero_highlight?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          timeline_eyebrow?: string | null
          timeline_heading?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      process_principles: {
        Row: {
          created_at: string | null
          id: string
          key: string | null
          sort_order: number | null
          updated_at: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key?: string | null
          sort_order?: number | null
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string | null
          sort_order?: number | null
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      process_steps: {
        Row: {
          deliverable1: string | null
          deliverable2: string | null
          deliverable3: string | null
          description: string
          id: string
          number_label: string
          sort_order: number
          title: string
          updated_at: string | null
          weeks: string | null
        }
        Insert: {
          deliverable1?: string | null
          deliverable2?: string | null
          deliverable3?: string | null
          description: string
          id?: string
          number_label: string
          sort_order?: number
          title: string
          updated_at?: string | null
          weeks?: string | null
        }
        Update: {
          deliverable1?: string | null
          deliverable2?: string | null
          deliverable3?: string | null
          description?: string
          id?: string
          number_label?: string
          sort_order?: number
          title?: string
          updated_at?: string | null
          weeks?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          area: string | null
          full_description: string | null
          id: string
          image_url: string
          location: string
          name: string
          number_label: string
          scope: string | null
          sort_order: number
          status: string
          system_description: string
          tag: string | null
          updated_at: string | null
          year: string
        }
        Insert: {
          area?: string | null
          full_description?: string | null
          id?: string
          image_url?: string
          location: string
          name: string
          number_label: string
          scope?: string | null
          sort_order?: number
          status?: string
          system_description: string
          tag?: string | null
          updated_at?: string | null
          year: string
        }
        Update: {
          area?: string | null
          full_description?: string | null
          id?: string
          image_url?: string
          location?: string
          name?: string
          number_label?: string
          scope?: string | null
          sort_order?: number
          status?: string
          system_description?: string
          tag?: string | null
          updated_at?: string | null
          year?: string
        }
        Relationships: []
      }
      projects_intro: {
        Row: {
          archive_cta_label: string
          archive_cta_link: string
          archive_title: string
          description: string
          eyebrow: string
          heading: string
          id: string
          singleton: boolean
          updated_at: string | null
        }
        Insert: {
          archive_cta_label?: string
          archive_cta_link?: string
          archive_title?: string
          description?: string
          eyebrow?: string
          heading?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Update: {
          archive_cta_label?: string
          archive_cta_link?: string
          archive_title?: string
          description?: string
          eyebrow?: string
          heading?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      projects_page: {
        Row: {
          created_at: string | null
          crumb: string | null
          cta_copy: string | null
          cta_title: string | null
          hero_eyebrow: string | null
          hero_highlight: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          modal_blurb: string | null
          stat1_label: string | null
          stat1_value: string | null
          stat2_label: string | null
          stat2_value: string | null
          stat3_label: string | null
          stat3_value: string | null
          stat4_label: string | null
          stat4_value: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          crumb?: string | null
          cta_copy?: string | null
          cta_title?: string | null
          hero_eyebrow?: string | null
          hero_highlight?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          modal_blurb?: string | null
          stat1_label?: string | null
          stat1_value?: string | null
          stat2_label?: string | null
          stat2_value?: string | null
          stat3_label?: string | null
          stat3_value?: string | null
          stat4_label?: string | null
          stat4_value?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          crumb?: string | null
          cta_copy?: string | null
          cta_title?: string | null
          hero_eyebrow?: string | null
          hero_highlight?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          modal_blurb?: string | null
          stat1_label?: string | null
          stat1_value?: string | null
          stat2_label?: string | null
          stat2_value?: string | null
          stat3_label?: string | null
          stat3_value?: string | null
          stat4_label?: string | null
          stat4_value?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          id: string
          landing_order: Json
          singleton: boolean
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          landing_order?: Json
          singleton?: boolean
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          landing_order?: Json
          singleton?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      statement: {
        Row: {
          eyebrow: string
          heading_accent: string
          heading_main: string
          id: string
          image_url: string
          meta1_key: string
          meta1_value: string
          meta2_key: string
          meta2_value: string
          meta3_key: string
          meta3_value: string
          meta4_key: string
          meta4_value: string
          paragraph1: string
          paragraph2: string
          singleton: boolean
          updated_at: string | null
        }
        Insert: {
          eyebrow?: string
          heading_accent?: string
          heading_main?: string
          id?: string
          image_url?: string
          meta1_key?: string
          meta1_value?: string
          meta2_key?: string
          meta2_value?: string
          meta3_key?: string
          meta3_value?: string
          meta4_key?: string
          meta4_value?: string
          paragraph1?: string
          paragraph2?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Update: {
          eyebrow?: string
          heading_accent?: string
          heading_main?: string
          id?: string
          image_url?: string
          meta1_key?: string
          meta1_value?: string
          meta2_key?: string
          meta2_value?: string
          meta3_key?: string
          meta3_value?: string
          meta4_key?: string
          meta4_value?: string
          paragraph1?: string
          paragraph2?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      why_cards: {
        Row: {
          description: string
          id: string
          number_label: string
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          description: string
          id?: string
          number_label: string
          sort_order?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          description?: string
          id?: string
          number_label?: string
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      why_intro: {
        Row: {
          eyebrow: string
          heading: string
          id: string
          singleton: boolean
          updated_at: string | null
        }
        Insert: {
          eyebrow?: string
          heading?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Update: {
          eyebrow?: string
          heading?: string
          id?: string
          singleton?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
