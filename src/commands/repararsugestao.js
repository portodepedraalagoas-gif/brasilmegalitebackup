import { repairSuggestion } from '../services/suggestions.js';
import { config } from '../config.js';

const definition = {
  name: 'repararsugestao',
  description: 'Restaura os botões de votação de uma sugestão antiga (staff).',
  options: [{
    type: 3,
    name: 'mensagem',
    description: 'Link ou ID da mensagem original da sugestão.',
    required: true,
    max_length: 200
  }]
};

export const data = { name: definition.name, toJSON: () => definition };

export async function execute(interaction) {
  await repairSuggestion(interaction, config.staffRoleId, interaction.options.getString('mensagem', true));
}
