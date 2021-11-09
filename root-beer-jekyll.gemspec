# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "root-beer-jekyll"
  spec.version       = "0.1.0"
  spec.authors       = ["ThalesVB"]
  spec.email         = ["thalesvb@live.com"]

  spec.summary       = "A Jekyll theme designed around Beer CSS."
  spec.homepage      = "https://github.com/thalesvb/root-beer-jekyll"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.8"

  spec.add_development_dependency "bundler", "~> 2.2.24"
  spec.add_development_dependency "rake", "~> 12.0"
  
  spec.add_development_dependency "kramdown-parser-gfm", "~> 1.1.0"
end
