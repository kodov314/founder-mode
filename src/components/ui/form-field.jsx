const FormField = ({ label, description, ...props }) => (
  <div className="space-y-2">
    <label className="block text-white font-medium">{label}</label>
    {props.type === "textarea" ? (
      <textarea 
        {...props}
        className="w-full p-3 rounded-2xl bg-gray-800/50 border border-gray-700 
          text-white placeholder-gray-400 focus:border-[#ff40ff]/50 
          focus:ring-1 focus:ring-[#ff40ff]/20 transition-colors"
        rows={4}
      />
    ) : (
      <input 
        {...props}
        className="w-full p-3 rounded-2xl bg-gray-800/50 border border-gray-700 
          text-white placeholder-gray-400 focus:border-[#ff40ff]/50 
          focus:ring-1 focus:ring-[#ff40ff]/20 transition-colors"
      />
    )}
    <p className="text-sm text-gray-400 whitespace-pre-line leading-relaxed">{description}</p>
  </div>
); 