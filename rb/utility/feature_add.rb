# Letscount SDK utility: feature_add
module LetscountUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
