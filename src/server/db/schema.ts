import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `description-generator-2025_${name}`,
);

export const posts = createTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    createdByIdIdx: index("created_by_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const ampBrands = createTable(
  "amp_brand",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampBrand) => ({
    ampBrandNameIndex: index("amp_brand_name_index").on(ampBrand.name),
  }),
);

export const ampSeries = createTable(
  "amp_series",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    brandId: integer("brand_id")
      .notNull()
      .references(() => ampBrands.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampSeries) => ({
    seriesBrandIdIdx: index("series_brand_id_idx").on(ampSeries.brandId),
    ampSeriesNameIndex: index("amp_series_name_index").on(ampSeries.name),
  }),
);

export const ampModels = createTable(
  "amp_model",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    brandId: integer("brand_id")
      .notNull()
      .references(() => ampBrands.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampModel) => ({
    modelBrandIdIdx: index("model_brand_id_idx").on(ampModel.brandId),
    ampModelNameIndex: index("amp_model_name_index").on(ampModel.name),
  }),
);

export const ampSubmodels = createTable(
  "amp_submodel",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    modelId: integer("model_id")
      .notNull()
      .references(() => ampModels.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampSubmodel) => ({
    submodelModelIdIdx: index("submodel_model_id_idx").on(ampSubmodel.modelId),
    ampSubmodelNameIndex: index("amp_submodel_name_index").on(ampSubmodel.name),
  }),
);

export const ampTypes = createTable(
  "amp_type",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampType) => ({
    ampTypeNameIndex: index("amp_type_name_index").on(ampType.name),
  }),
);

export const ampCountryOfOrigins = createTable(
  "amp_country_of_origin",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampCountryOfOrigin) => ({
    ampCountryOfOriginNameIndex: index("amp_country_of_origin_name_index").on(
      ampCountryOfOrigin.name,
    ),
  }),
);

export const ampConditions = createTable(
  "amp_condition",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampCondition) => ({
    ampConditionNameIndex: index("amp_condition_name_index").on(
      ampCondition.name,
    ),
  }),
);

export const ampPowers = createTable(
  "amp_power",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampPower) => ({
    ampPowerNameIndex: index("amp_power_name_index").on(ampPower.name),
  }),
);

export const ampCabinetMaterials = createTable(
  "amp_cabinet_material",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampCabinetMaterial) => ({
    ampCabinetMaterialNameIndex: index("amp_cabinet_material_name_index").on(
      ampCabinetMaterial.name,
    ),
  }),
);

export const ampExteriorMaterials = createTable(
  "amp_exterior_material",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampExteriorMaterial) => ({
    ampExteriorMaterialNameIndex: index("amp_exterior_material_name_index").on(
      ampExteriorMaterial.name,
    ),
  }),
);

export const ampGrilles = createTable(
  "amp_grille",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampGrille) => ({
    ampGrilleNameIndex: index("amp_grille_name_index").on(ampGrille.name),
  }),
);

export const ampPanels = createTable(
  "amp_panel",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampPanel) => ({
    ampPanelNameIndex: index("amp_panel_name_index").on(ampPanel.name),
  }),
);

export const ampPreampTubes = createTable(
  "amp_preamp_tube",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampPreampTube) => ({
    ampPreampTubeNameIndex: index("amp_preamp_tube_name_index").on(
      ampPreampTube.name,
    ),
  }),
);

export const ampPowerTubes = createTable(
  "amp_power_tube",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampPowerTube) => ({
    ampPowerTubeNameIndex: index("amp_power_tube_name_index").on(
      ampPowerTube.name,
    ),
  }),
);

export const ampPhaseInverterTubes = createTable(
  "amp_phase_inverter_tube",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampPhaseInverterTube) => ({
    ampPhaseInverterTubeNameIndex: index(
      "amp_phase_inverter_tube_name_index",
    ).on(ampPhaseInverterTube.name),
  }),
);
export const ampRectifiers = createTable(
  "amp_rectifier",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampRectifier) => ({
    ampRectifierNameIndex: index("amp_rectifier_name_index").on(
      ampRectifier.name,
    ),
  }),
);

export const ampMasterVolumes = createTable(
  "amp_master_volume",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampMasterVolume) => ({
    ampMasterVolumeNameIndex: index("amp_master_volume_name_index").on(
      ampMasterVolume.name,
    ),
  }),
);

export const ampChannels = createTable(
  "amp_channel",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampChannel) => ({
    ampChannelNameIndex: index("amp_channel_name_index").on(ampChannel.name),
  }),
);

export const ampEffectsLoops = createTable(
  "amp_effects_loop",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampEffectsLoop) => ({
    ampEffectsLoopNameIndex: index("amp_effects_loop_name_index").on(
      ampEffectsLoop.name,
    ),
  }),
);

export const ampInputs = createTable(
  "amp_input",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampInput) => ({
    ampInputNameIndex: index("amp_input_name_index").on(ampInput.name),
  }),
);

export const ampOutputs = createTable(
  "amp_output",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampOutput) => ({
    ampOutputNameIndex: index("amp_output_name_index").on(ampOutput.name),
  }),
);

export const ampOutputImpedances = createTable(
  "amp_output_impedance",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampOutputImpedance) => ({
    ampOutputImpedanceNameIndex: index("amp_output_impedance_name_index").on(
      ampOutputImpedance.name,
    ),
  }),
);

export const ampSpeakerConfigs = createTable(
  "amp_speaker_config",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampSpeakerConfig) => ({
    ampSpeakerConfigNameIndex: index("amp_speaker_config_name_index").on(
      ampSpeakerConfig.name,
    ),
  }),
);

export const ampSpeakerModel = createTable(
  "amp_speaker_model",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampSpeakerModel) => ({
    ampSpeakerModelNameIndex: index("amp_speaker_model_name_index").on(
      ampSpeakerModel.name,
    ),
  }),
);

export const ampInputVoltages = createTable(
  "amp_input_voltage",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampInputVoltage) => ({
    ampVoltageNameIndex: index("amp_voltage_name_index").on(
      ampInputVoltage.name,
    ),
  }),
);

export const ampGroundings = createTable(
  "amp_grounding",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (ampGrounding) => ({
    ampGroundingNameIndex: index("amp_grounding_name_index").on(
      ampGrounding.name,
    ),
  }),
);

export const ampOtherFeatures = createTable(
  "amp_other_feature",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    }).$onUpdate(() => new Date()),
  },
  (ampOtherFeature) => ({
    ampOtherFeatureNameIndex: index("amp_other_feature_name_index").on(
      ampOtherFeature.name,
    ),
  }),
);

export const ampFormPresets = createTable(
  "amp_form_preset",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    sortAs: varchar("sort_as", { length: 256 }),
    brandId: integer("brand_id")
      .notNull()
      .references(() => ampBrands.id),
    seriesId: integer("series_id")
      .notNull()
      .references(() => ampSeries.id),
    modelId: integer("model_id")
      .notNull()
      .references(() => ampModels.id),
    submodelId: integer("submodel_id").references(() => ampSubmodels.id),
    typeId: integer("type_id")
      .notNull()
      .references(() => ampTypes.id),
    countryOfOriginId: integer("country_of_origin_id")
      .notNull()
      .references(() => ampCountryOfOrigins.id),
    conditionId: integer("condition_id")
      .notNull()
      .references(() => ampConditions.id),
    powerId: integer("power_id")
      .notNull()
      .references(() => ampPowers.id),
    cabinetMaterialId: integer("cabinet_material_id")
      .notNull()
      .references(() => ampCabinetMaterials.id),
    exteriorMaterialId: integer("exterior_material_id")
      .notNull()
      .references(() => ampExteriorMaterials.id),
    grilleId: integer("grille_id")
      .notNull()
      .references(() => ampGrilles.id),
    panelId: integer("panel_id")
      .notNull()
      .references(() => ampPanels.id),
    preampTubeId: integer("preamp_tube_id")
      .notNull()
      .references(() => ampPreampTubes.id),
    powerTubeId: integer("power_tube_id")
      .notNull()
      .references(() => ampPowerTubes.id),
    phaseInverterTubeId: integer("phase_inverter_tube_id")
      .notNull()
      .references(() => ampPhaseInverterTubes.id),
    rectifierId: integer("rectifier_id")
      .notNull()
      .references(() => ampRectifiers.id),
    masterVolumeId: integer("master_volume_id")
      .notNull()
      .references(() => ampMasterVolumes.id),
    channelId: integer("channel_id")
      .notNull()
      .references(() => ampChannels.id),
    effectsLoopId: integer("effects_loop_id")
      .notNull()
      .references(() => ampEffectsLoops.id),
    inputId: integer("input_id")
      .notNull()
      .references(() => ampInputs.id),
    outputId: integer("output_id")
      .notNull()
      .references(() => ampOutputs.id),
    outputImpedanceId: integer("output_impedance_id")
      .notNull()
      .references(() => ampOutputImpedances.id),
    speakerConfigId: integer("speaker_config_id")
      .notNull()
      .references(() => ampSpeakerConfigs.id),
    speakerModelId: integer("speaker_model_id")
      .notNull()
      .references(() => ampSpeakerModel.id),
    inputVoltageId: integer("input_voltage_id")
      .notNull()
      .references(() => ampInputVoltages.id),
    groundingId: integer("grounding_id")
      .notNull()
      .references(() => ampGroundings.id),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    }).$onUpdate(() => new Date()),
  },
  (ampFormPreset) => ({
    ampFormPresetNameIndex: index("amp_form_preset_name_index").on(
      ampFormPreset.name,
    ),
  }),
);

export const ampOtherFeaturesToFormPresets = createTable(
  "amp_other_features_to_form_presets",
  {
    otherFeatureId: integer("other_feature_id")
      .notNull()
      .references(() => ampOtherFeatures.id),
    formPresetId: integer("form_preset_id")
      .notNull()
      .references(() => ampFormPresets.id),
  },
  (ampOtherFeatureFormPreset) => ({
    pk: primaryKey({
      columns: [
        ampOtherFeatureFormPreset.otherFeatureId,
        ampOtherFeatureFormPreset.formPresetId,
      ],
    }),
  }),
);

export const ampFormPresetsRelations = relations(
  ampFormPresets,
  ({ many }) => ({
    ampOtherFeaturesToFormPresets: many(ampOtherFeaturesToFormPresets),
  }),
);
export const ampOtherFeaturesRelations = relations(
  ampOtherFeatures,
  ({ many }) => ({
    ampOtherFeaturesToFormPresets: many(ampOtherFeaturesToFormPresets),
  }),
);
export const ampOtherFeaturesToFormPresetsRelations = relations(
  ampOtherFeaturesToFormPresets,
  ({ one }) => ({
    ampOtherFeatures: one(ampOtherFeatures, {
      fields: [ampOtherFeaturesToFormPresets.otherFeatureId],
      references: [ampOtherFeatures.id],
    }),
    ampFormPresets: one(ampFormPresets, {
      fields: [ampOtherFeaturesToFormPresets.formPresetId],
      references: [ampFormPresets.id],
    }),
  }),
);

// AUTH SCHEMA BELOW - DO NOT REMOVE

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
