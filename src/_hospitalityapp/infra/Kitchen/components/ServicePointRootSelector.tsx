import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, GlassWater, LayoutGrid } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from '@tanstack/react-router';

const modules = [
  { id: 'bar', name: 'Bar', icon: <GlassWater size={40} />, delay: 0.1 },
  { id: 'kitchen', name: 'Kitchen', icon: <Utensils size={40} />, delay: 0.2 },
  { id: 'other', name: 'General', icon: <LayoutGrid size={40} />, delay: 0.3 },
];

const ServicePointRootSelector: React.FC = () => {
  const nav = useNavigate()
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-5xl w-full">
        {modules.map((module) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: module.delay }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
            onClick={()=> nav({
              to:"/dashboard/sharp_hospitality/infra/kitchen/$service_point/service",
              params:{
                service_point:"iut"
              }
            })} 
             className="cursor-pointer border-zinc-200 hover:border-black transition-colors duration-300 shadow-sm hover:shadow-xl">
              <CardContent className="flex flex-col items-center justify-center p-12">
                <motion.div 
                  className="mb-6 text-zinc-400 group-hover:text-black transition-colors"
                  whileHover={{ rotate: 5 }}
                >
                  {module.icon}
                </motion.div>
                <h3 className="text-lg font-semibold tracking-tighter uppercase ">
                  {module.name}
                </h3>
                <div className="mt-2 h-1 w-0 transition-all duration-300 group-hover:w-full" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicePointRootSelector;